import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminCertificates = () => {
  const { toast } = useToast();
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    certificate_number: "",
    student_name: "",
    father_name: "",
    mother_name: "",
    course_name: "",
    issue_date: "",
    training_from: "",
    training_to: "",
    grade: "A++",
  });
  const [generating, setGenerating] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [barcodeUrl, setBarcodeUrl] = useState("");

  const loadCerts = async () => {
    const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false }).limit(20);
    if (data) setCerts(data);
  };

  useEffect(() => { loadCerts(); }, []);

  const generateCodes = (certNumber: string) => {
    const verifyUrl = `https://www.siat.in/verify?cert=${encodeURIComponent(certNumber)}`;
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verifyUrl)}`;
    const barcode = `https://barcodes4.me/barcode/c128b/${encodeURIComponent(certNumber)}.png?height=80&resolution=2`;
    return { qr, barcode };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQrUrl("");
    setBarcodeUrl("");

    const { qr, barcode } = generateCodes(form.certificate_number);

    const { error } = await supabase.from("certificates").insert({
      ...form,
      qr_code_url: qr,
      is_valid: true,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setQrUrl(qr);
      setBarcodeUrl(barcode);
      toast({ title: "Certificate created!", description: "QR & Barcode generated. Download below." });
      setForm({ certificate_number: "", student_name: "", father_name: "", mother_name: "", course_name: "", issue_date: "", training_from: "", training_to: "", grade: "A++" });
      loadCerts();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    await supabase.from("certificates").delete().eq("id", id);
    loadCerts();
    toast({ title: "Deleted" });
  };

  const downloadImage = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.target = "_blank";
    a.click();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-display font-bold text-foreground">Create Certificate</h2>

      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: "certificate_number", label: "Certificate Number", placeholder: "SIAT/2015-16/113", required: true },
            { key: "student_name", label: "Student Name", required: true },
            { key: "father_name", label: "Father's Name" },
            { key: "mother_name", label: "Mother's Name" },
            { key: "course_name", label: "Course Name", required: true },
            { key: "grade", label: "Grade" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium text-foreground block mb-1">{field.label}</label>
              <input
                type="text"
                value={(form as any)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder || ""}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground"
                required={field.required}
              />
            </div>
          ))}
          {[
            { key: "issue_date", label: "Issue Date" },
            { key: "training_from", label: "Training From" },
            { key: "training_to", label: "Training To" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium text-foreground block mb-1">{field.label}</label>
              <input
                type="date"
                value={(form as any)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground"
                required={field.key === "issue_date"}
              />
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-primary-glow !py-2.5 !px-6 !text-sm disabled:opacity-50">
          {loading ? "Creating..." : "Generate Certificate + QR & Barcode"}
        </button>
      </form>

      {/* Generated codes */}
      {(qrUrl || barcodeUrl) && (
        <div className="glass-card p-6">
          <h3 className="font-display font-bold text-foreground mb-4">Generated Codes — Download & use in Photoshop</h3>
          <div className="flex flex-wrap gap-6">
            {qrUrl && (
              <div className="text-center">
                <img src={qrUrl} alt="QR Code" className="w-40 h-40 border border-border rounded-lg" />
                <button onClick={() => downloadImage(qrUrl, "qr-code.png")} className="mt-2 flex items-center gap-1 text-sm text-primary mx-auto">
                  <Download className="w-3 h-3" /> Download QR
                </button>
              </div>
            )}
            {barcodeUrl && (
              <div className="text-center">
                <img src={barcodeUrl} alt="Barcode" className="h-20 border border-border rounded-lg" />
                <button onClick={() => downloadImage(barcodeUrl, "barcode.png")} className="mt-2 flex items-center gap-1 text-sm text-primary mx-auto">
                  <Download className="w-3 h-3" /> Download Barcode
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent certs */}
      <div>
        <h3 className="font-display font-bold text-foreground mb-4">Recent Certificates</h3>
        <div className="space-y-2">
          {certs.map((cert) => (
            <div key={cert.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">{cert.certificate_number} — {cert.student_name}</p>
                <p className="text-xs text-muted-foreground">{cert.course_name} | {cert.issue_date}</p>
              </div>
              <button onClick={() => handleDelete(cert.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
