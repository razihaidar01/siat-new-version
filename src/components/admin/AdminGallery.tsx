import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, Image as ImageIcon, Video as VideoIcon, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { compressVideo, readVideoDuration } from "@/lib/videoCompress";

type MediaType = "image" | "video";
type Phase = "idle" | "loading-ffmpeg" | "compressing" | "uploading" | "saving" | "done";

const formatBytes = (b: number) => {
  if (!b) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0; let n = b;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n > 10 ? 0 : 1)} ${units[i]}`;
};

const AdminGallery = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");

  // upload progress state
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const busy = phase !== "idle" && phase !== "done";

  const loadItems = async () => {
    const { data } = await supabase.from("images").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { loadItems(); }, []);

  const resetState = () => {
    setPhase("idle"); setProgress(0); setStatusMsg(""); setErrorMsg("");
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting same file
    if (!file) return;
    if (!title.trim()) { toast({ title: "Enter a title first", variant: "destructive" }); return; }

    setErrorMsg("");
    setProgress(0);

    try {
      let uploadFile: File = file;
      let durationSeconds: number | null = null;

      if (mediaType === "video") {
        // hard limit safety: 1 GB raw; ffmpeg.wasm chokes on huge files
        if (file.size > 1024 * 1024 * 1024) {
          throw new Error("Video too large (max 1 GB raw input). Please trim it first.");
        }

        durationSeconds = await readVideoDuration(file);

        setPhase("loading-ffmpeg");
        setStatusMsg("Loading compressor (first time only, ~25 MB)…");

        setPhase("compressing");
        setStatusMsg(`Compressing ${formatBytes(file.size)} video…`);

        uploadFile = await compressVideo(file, {
          maxHeight: 720,
          crf: 28,
          onProgress: (r) => setProgress(Math.round(r * 100)),
        });

        setStatusMsg(`Compressed ${formatBytes(file.size)} → ${formatBytes(uploadFile.size)}`);
      }

      setPhase("uploading");
      setProgress(0);
      setStatusMsg("Uploading to storage…");

      const ext = uploadFile.name.split(".").pop() || (mediaType === "video" ? "mp4" : "jpg");
      const bucket = mediaType === "video" ? "gallery-videos" : "images";
      const path = `gallery/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, uploadFile, {
          cacheControl: "31536000",
          contentType: uploadFile.type || (mediaType === "video" ? "video/mp4" : undefined),
        });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);

      setPhase("saving");
      setStatusMsg("Saving entry…");

      const { error } = await supabase.from("images").insert({
        title: title.trim(),
        category,
        file_url: publicUrl,
        media_type: mediaType,
        duration_seconds: durationSeconds,
        file_size_bytes: uploadFile.size,
      });
      if (error) throw error;

      setPhase("done");
      setStatusMsg("Uploaded ✓");
      toast({ title: mediaType === "video" ? "Video uploaded" : "Image uploaded" });
      setTitle("");
      loadItems();

      // auto-reset status after 2s
      setTimeout(resetState, 2000);
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || String(err) || "Upload failed";
      setErrorMsg(msg);
      setPhase("idle");
      setStatusMsg("");
      toast({ title: "Upload failed", description: msg, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("images").delete().eq("id", id);
    loadItems();
    toast({ title: "Deleted" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Gallery Management</h2>

      <div className="glass-card p-6 space-y-4">
        {/* Type toggle */}
        <div className="flex gap-2">
          {(["image", "video"] as MediaType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => !busy && setMediaType(t)}
              disabled={busy}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                mediaType === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              } disabled:opacity-50`}
            >
              {t === "image" ? <ImageIcon className="w-4 h-4" /> : <VideoIcon className="w-4 h-4" />}
              {t === "image" ? "Image" : "Video"}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={mediaType === "video" ? "Video title" : "Image title"}
              disabled={busy}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={busy}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground disabled:opacity-50"
            >
              <option value="general">General</option>
              <option value="lab">Lab</option>
              <option value="event">Event</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="training">Training</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">
              Upload {mediaType === "video" ? "Video" : "Image"}
            </label>
            <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors ${busy ? "opacity-60 cursor-wait" : "cursor-pointer"}`}>
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {busy ? "Working…" : "Choose File"}
              <input
                type="file"
                accept={mediaType === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*"}
                className="hidden"
                onChange={handleFile}
                disabled={busy}
              />
            </label>
          </div>
        </div>

        {/* Status / progress */}
        {(busy || statusMsg || errorMsg) && (
          <div className="space-y-2 pt-2">
            {statusMsg && (
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                {busy && <Loader2 className="w-3 h-3 animate-spin" />}
                {statusMsg}
              </p>
            )}
            {(phase === "compressing" || phase === "uploading") && progress > 0 && (
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            {errorMsg && (
              <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span className="break-words">{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {mediaType === "video" && !busy && !errorMsg && (
          <p className="text-xs text-muted-foreground">
            Videos are auto-compressed to 720p H.264 in your browser before upload (max 1 GB raw input). Final file usually 5–40 MB.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.id} className="glass-card overflow-hidden group">
            <div className="aspect-square relative bg-black">
              {it.media_type === "video" ? (
                <video
                  src={it.file_url}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); }}
                  onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                />
              ) : (
                <img src={it.file_url} alt={it.title} className="w-full h-full object-cover" />
              )}
              {it.media_type === "video" && (
                <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-semibold">
                  <VideoIcon className="w-3 h-3" /> VIDEO
                </div>
              )}
              <button
                onClick={() => handleDelete(it.id)}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground truncate">{it.title}</p>
              <p className="text-xs text-muted-foreground">
                {it.category}
                {it.file_size_bytes ? ` · ${formatBytes(it.file_size_bytes)}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
