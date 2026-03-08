import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Download, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBarcodeDataUrl, getQRUrl } from "@/lib/codegen";

const AdminCertSearch = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    if (!query.trim()) {
      const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false }).limit(50);
      if (data) setResults(data);
    } else {
      const { data } = await supabase.from("certificates").select("*")
        .or(`certificate_number.ilike.%${query}%,student_name.ilike.%${query}%,course_name.ilike.%${query}%`)
        .order("created_at", { ascending: false }).limit(50);
      if (data) setResults(data);
    }
    setLoading(false);
  };

  useEffect(() => { handleSearch(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("certificates").delete().eq("id", id);
    handleSearch();
    toast({ title: "Deleted" });
  };

  const downloadImage = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Search & Manage Certificates</h2>
      
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by certificate number, name, or course..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary outline-none text-sm text-foreground"
        />
        <button type="submit" className="btn-primary-glow !py-2.5 !px-5 !text-sm flex items-center gap-2">
          <Search className="w-4 h-4" /> Search
        </button>
      </form>

      <div className="text-sm text-muted-foreground">{results.length} certificate(s) found</div>

      <div className="space-y-3">
        {results.map((cert) => (
          <div key={cert.id} className="glass-card p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-foreground">{cert.certificate_number}</p>
                <p className="text-sm text-muted-foreground">{cert.student_name} — {cert.course_name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Father: {cert.father_name || "—"} | Mother: {cert.mother_name || "—"} | Grade: {cert.grade || "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Issue: {cert.issue_date} | Training: {cert.training_from || "—"} to {cert.training_to || "—"}
                </p>
              </div>
              <div className="flex gap-2">
                <a href={`/verify-certificate?cert=${encodeURIComponent(cert.certificate_number)}`} target="_blank" className="p-2 hover:bg-secondary rounded-lg">
                  <Eye className="w-4 h-4 text-primary" />
                </a>
                <button onClick={() => handleDelete(cert.id)} className="p-2 hover:bg-destructive/10 rounded-lg">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 items-end">
              <div className="text-center">
                <img src={getQRUrl(cert.certificate_number)} alt="QR" className="w-24 h-24 border border-border rounded" />
                <button onClick={() => downloadImage(getQRUrl(cert.certificate_number), `qr-${cert.certificate_number}.png`)} className="text-xs text-primary flex items-center gap-1 justify-center mt-1">
                  <Download className="w-3 h-3" /> QR
                </button>
              </div>
              <div className="text-center">
                <img src={generateBarcodeDataUrl(cert.certificate_number)} alt="Barcode" className="h-20 border border-border rounded" />
                <button onClick={() => downloadImage(generateBarcodeDataUrl(cert.certificate_number), `barcode-${cert.certificate_number}.png`)} className="text-xs text-primary flex items-center gap-1 justify-center mt-1">
                  <Download className="w-3 h-3" /> Barcode
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCertSearch;
