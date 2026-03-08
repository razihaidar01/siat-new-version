import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Download, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

const VERIFY_BASE_URL = "https://www.siat.in/verify";

interface Certificate {
  id: string;
  certificate_number: string;
  student_name: string;
  course_name: string;
  issue_date: string;
  expiry_date: string | null;
  is_valid: boolean | null;
  father_name: string | null;
  mother_name: string | null;
  training_from: string | null;
  training_to: string | null;
  grade: string | null;
  created_at: string;
}

const formatDate = (d: string | null) => {
  if (!d) return "—";
  const dt = new Date(d);
  return `${String(dt.getDate()).padStart(2, "0")}-${String(dt.getMonth() + 1).padStart(2, "0")}-${dt.getFullYear()}`;
};

const CertificateSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) {
      // Load all if empty
      setLoading(true);
      setSearched(true);
      const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false }).limit(50);
      setResults((data as Certificate[]) || []);
      setLoading(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const q = query.trim();
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .or(`certificate_number.ilike.%${q}%,student_name.ilike.%${q}%,course_name.ilike.%${q}%`)
      .order("created_at", { ascending: false })
      .limit(50);
    setResults((data as Certificate[]) || []);
    setLoading(false);
  };

  const downloadQR = async (certNum: string) => {
    const url = `${VERIFY_BASE_URL}?cert=${encodeURIComponent(certNum)}`;
    const qrDataUrl = await QRCode.toDataURL(url, { width: 600, margin: 2, color: { dark: "#1a1a2e", light: "#ffffff" } });
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR-${certNum.replace(/\//g, "_")}.png`;
    link.click();
    toast.success("QR downloaded!");
  };

  const downloadBarcode = (certNum: string) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, certNum, { format: "CODE128", width: 3, height: 80, displayValue: true, fontSize: 16, margin: 10, background: "#ffffff", lineColor: "#1a1a1a" });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `Barcode-${certNum.replace(/\//g, "_")}.png`;
    link.click();
    toast.success("Barcode downloaded!");
  };

  const toggleValid = async (cert: Certificate) => {
    const { error } = await supabase.from("certificates").update({ is_valid: !cert.is_valid }).eq("id", cert.id);
    if (error) { toast.error("Update failed"); return; }
    toast.success(`Certificate ${!cert.is_valid ? "activated" : "revoked"}`);
    setResults(prev => prev.map(c => c.id === cert.id ? { ...c, is_valid: !c.is_valid } : c));
  };

  const deleteCert = async (cert: Certificate) => {
    if (!confirm(`Delete certificate ${cert.certificate_number}?`)) return;
    const { error } = await supabase.from("certificates").delete().eq("id", cert.id);
    if (error) { toast.error("Delete failed"); return; }
    toast.success("Certificate deleted");
    setResults(prev => prev.filter(c => c.id !== cert.id));
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground";

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary" /> Search Certificates
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by certificate number, student name, or course..."
            className={`${inputClass} flex-1`}
          />
          <button type="submit" disabled={loading} className="btn-primary-glow !py-2.5 !px-5 flex items-center gap-2 !text-sm">
            <Search className="w-4 h-4" /> {loading ? "Searching..." : "Search"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Leave empty and search to view all recent certificates (max 50).</p>
      </form>

      {/* Results */}
      {searched && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">{results.length} certificate(s) found</p>
          {results.length === 0 ? (
            <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">
              No certificates found matching your search.
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((cert) => (
                <div key={cert.id} className="glass-card p-5 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-mono text-sm font-bold text-foreground">{cert.certificate_number}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          cert.is_valid ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                        }`}>
                          {cert.is_valid ? "Valid" : "Revoked"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-sm">
                        <div><span className="text-muted-foreground">Student:</span> <span className="text-foreground font-medium">{cert.student_name}</span></div>
                        <div><span className="text-muted-foreground">Course:</span> <span className="text-foreground font-medium">{cert.course_name}</span></div>
                        <div><span className="text-muted-foreground">Grade:</span> <span className="text-foreground font-medium">{cert.grade || "—"}</span></div>
                        {cert.father_name && <div><span className="text-muted-foreground">Father:</span> <span className="text-foreground">{cert.father_name}</span></div>}
                        {cert.mother_name && <div><span className="text-muted-foreground">Mother:</span> <span className="text-foreground">{cert.mother_name}</span></div>}
                        <div><span className="text-muted-foreground">Issue:</span> <span className="text-foreground">{formatDate(cert.issue_date)}</span></div>
                        {cert.training_from && <div><span className="text-muted-foreground">Training:</span> <span className="text-foreground">{formatDate(cert.training_from)} – {formatDate(cert.training_to)}</span></div>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      <button onClick={() => downloadQR(cert.certificate_number)}
                        className="px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-medium flex items-center gap-1.5 transition-colors">
                        <Download className="w-3.5 h-3.5" /> QR
                      </button>
                      <button onClick={() => downloadBarcode(cert.certificate_number)}
                        className="px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-medium flex items-center gap-1.5 transition-colors">
                        <Download className="w-3.5 h-3.5" /> Barcode
                      </button>
                      <button onClick={() => toggleValid(cert)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                          cert.is_valid ? "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                        }`}>
                        {cert.is_valid ? <><ShieldOff className="w-3.5 h-3.5" /> Revoke</> : <><ShieldCheck className="w-3.5 h-3.5" /> Activate</>}
                      </button>
                      <button onClick={() => deleteCert(cert)}
                        className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-medium flex items-center gap-1.5 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateSearch;
