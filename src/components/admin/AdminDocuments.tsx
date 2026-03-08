import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDocuments = () => {
  const { toast } = useToast();
  const [docs, setDocs] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [isPublic, setIsPublic] = useState(true);

  const loadDocs = async () => {
    const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    if (data) setDocs(data);
  };

  useEffect(() => { loadDocs(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !title.trim()) { toast({ title: "Enter a title first", variant: "destructive" }); return; }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `docs/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("documents").upload(path, file);
    if (uploadError) { toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" }); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from("documents").getPublicUrl(path);

    const { error } = await supabase.from("documents").insert({ title, description, category, file_url: publicUrl, is_public: isPublic });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Document uploaded!" }); setTitle(""); setDescription(""); loadDocs(); }
    setUploading(false);
  };

  const togglePublic = async (id: string, current: boolean) => {
    await supabase.from("documents").update({ is_public: !current }).eq("id", id);
    loadDocs();
    toast({ title: !current ? "Made public" : "Made private" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("documents").delete().eq("id", id);
    loadDocs();
    toast({ title: "Deleted" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Documents Manager</h2>
      <p className="text-sm text-muted-foreground">Upload documents. Public documents appear on the website. Private documents (matching certificate numbers) are shown on the verification page.</p>

      <div className="glass-card p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Title (use cert number for certificate documents)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. SIAT/2015-16/113"
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description"
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground">
              <option value="general">General</option>
              <option value="certificate">Certificate</option>
              <option value="brochure">Brochure</option>
              <option value="tender">Tender</option>
            </select>
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="rounded" />
              <span className="text-sm text-foreground">Public (show on website)</span>
            </label>
          </div>
        </div>
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground cursor-pointer text-sm font-medium w-fit hover:bg-primary/90 transition-colors">
          <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Document"}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="space-y-2">
        {docs.map((doc) => (
          <div key={doc.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">{doc.title}</p>
              <p className="text-xs text-muted-foreground">{doc.category} · {doc.description || "No description"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => togglePublic(doc.id, doc.is_public)}
                className={`p-2 rounded-lg transition-colors ${doc.is_public ? "text-primary hover:bg-primary/10" : "text-muted-foreground hover:bg-secondary"}`}>
                {doc.is_public ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <a href={doc.file_url} target="_blank" className="text-xs text-primary underline">View</a>
              <button onClick={() => handleDelete(doc.id)} className="p-2 hover:bg-destructive/10 rounded-lg">
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDocuments;
