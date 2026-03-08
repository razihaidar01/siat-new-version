import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award, QrCode, Download } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

const VERIFY_BASE_URL = "https://www.siat.in/verify";

const generateCertNumber = () => {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SIAT-${year}-${rand}`;
};

const CertificateCreate = () => {
  const [saving, setSaving] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState("");
  const [trainingFrom, setTrainingFrom] = useState("");
  const [trainingTo, setTrainingTo] = useState("");
  const [grade, setGrade] = useState("A++");
  const [certNumber, setCertNumber] = useState(generateCertNumber());
  const [createdCert, setCreatedCert] = useState<string | null>(null);

  const getVerifyUrl = (certNum: string) =>
    `${VERIFY_BASE_URL}?cert=${encodeURIComponent(certNum)}`;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !courseName.trim()) {
      toast.error("Student name and course are required.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("certificates").insert({
        certificate_number: certNumber,
        student_name: studentName.trim(),
        course_name: courseName.trim(),
        issue_date: issueDate,
        expiry_date: expiryDate || null,
        qr_code_url: getVerifyUrl(certNumber),
        is_valid: true,
        father_name: fatherName.trim() || null,
        mother_name: motherName.trim() || null,
        training_from: trainingFrom || null,
        training_to: trainingTo || null,
        grade: grade,
      } as any);

      if (error) {
        if (error.code === "23505") {
          toast.error("Duplicate certificate number.");
          setCertNumber(generateCertNumber());
        } else {
          toast.error("Failed: " + error.message);
        }
      } else {
        toast.success("Certificate created!");
        setCreatedCert(certNumber);
        resetForm();
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    }
    setSaving(false);
  };

  const resetForm = () => {
    setStudentName("");
    setFatherName("");
    setMotherName("");
    setCourseName("");
    setIssueDate(new Date().toISOString().split("T")[0]);
    setExpiryDate("");
    setTrainingFrom("");
    setTrainingTo("");
    setGrade("A++");
    setCertNumber(generateCertNumber());
  };

  const downloadQR = async (certNum: string) => {
    const qrDataUrl = await QRCode.toDataURL(getVerifyUrl(certNum), {
      width: 600, margin: 2, color: { dark: "#1a1a2e", light: "#ffffff" },
    });
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR-${certNum.replace(/\//g, "_")}.png`;
    link.click();
    toast.success("QR Code downloaded!");
  };

  const downloadBarcode = (certNum: string) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, certNum, {
      format: "CODE128", width: 3, height: 80, displayValue: true,
      fontSize: 16, margin: 10, background: "#ffffff", lineColor: "#1a1a1a",
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `Barcode-${certNum.replace(/\//g, "_")}.png`;
    link.click();
    toast.success("Barcode downloaded!");
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground";

  return (
    <div className="space-y-8">
      {createdCert && (
        <div className="glass-card p-6 rounded-xl border-2 border-green-500/30">
          <h3 className="text-lg font-display font-bold text-green-400 mb-2">✓ Certificate Created: {createdCert}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Download QR & Barcode, paste them in Photoshop, then upload final certificate in Documents with title = certificate number.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => downloadQR(createdCert)} className="btn-primary-glow !py-2.5 !px-5 flex items-center gap-2">
              <Download className="w-4 h-4" /> Download QR Code
            </button>
            <button onClick={() => downloadBarcode(createdCert)}
              className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Barcode
            </button>
            <button onClick={() => setCreatedCert(null)}
              className="px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground">
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-primary" /> Create Certificate
        </h3>
        <form onSubmit={handleCreate} className="space-y-4 border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Certificate Number</label>
              <div className="flex gap-2">
                <input type="text" value={certNumber} onChange={(e) => setCertNumber(e.target.value)}
                  className={`${inputClass} flex-1 font-mono`} required />
                <button type="button" onClick={() => setCertNumber(generateCertNumber())}
                  className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80">Generate</button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Student Name *</label>
              <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)}
                className={inputClass} placeholder="Full name" maxLength={100} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Father's Name</label>
              <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)}
                className={inputClass} placeholder="Father's name" maxLength={100} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Mother's Name</label>
              <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)}
                className={inputClass} placeholder="Mother's name" maxLength={100} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Course Name *</label>
              <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}
                className={inputClass} placeholder="e.g. Python" maxLength={150} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Grade</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className={inputClass}>
                <option value="A++">A++</option><option value="A+">A+</option><option value="A">A</option>
                <option value="B+">B+</option><option value="B">B</option><option value="C">C</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Training From</label>
              <input type="date" value={trainingFrom} onChange={(e) => setTrainingFrom(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Training To</label>
              <input type="date" value={trainingTo} onChange={(e) => setTrainingTo(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Issue Date *</label>
              <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Expiry Date (optional)</label>
              <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className={inputClass} />
            </div>
          </div>
          <button type="submit" disabled={saving} className="btn-primary-glow !py-2.5 !px-6 flex items-center gap-2">
            <QrCode className="w-4 h-4" /> {saving ? "Saving..." : "Create Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CertificateCreate;
