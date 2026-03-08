import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminGallery = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");

  const loadImages = async () => {
    const { data } = await supabase.from("images").select("*").order("created_at", { ascending: false });
    if (data) setImages(data);
  };

  useEffect(() => { loadImages(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !title.trim()) { toast({ title: "Enter a title first", variant: "destructive" }); return; }
    
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("images").upload(path, file);
    if (uploadError) { toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" }); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(path);

    const { error } = await supabase.from("images").insert({ title, category, file_url: publicUrl });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Image uploaded!" }); setTitle(""); loadImages(); }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("images").delete().eq("id", id);
    loadImages();
    toast({ title: "Deleted" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Gallery Management</h2>
      
      <div className="glass-card p-6 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Image title"
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground">
              <option value="general">General</option>
              <option value="lab">Lab</option>
              <option value="event">Event</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="training">Training</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Upload Image</label>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground cursor-pointer text-sm font-medium hover:bg-primary/90 transition-colors">
              <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Choose File"}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="glass-card overflow-hidden group">
            <div className="aspect-square relative">
              <img src={img.file_url} alt={img.title} className="w-full h-full object-cover" />
              <button onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground truncate">{img.title}</p>
              <p className="text-xs text-muted-foreground">{img.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
