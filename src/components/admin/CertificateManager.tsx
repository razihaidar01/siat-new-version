import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award, Trash2, Download, Plus, QrCode } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

interface Certificate {
  id: string;
  certificate_number: string;
  student_name: string;
  course_name: string;
  issue_date: string;
  expiry_date: string | null;
  is_valid: boolean | null;
  qr_code_url: string | null;
  created_at: string;
  father_name: string | null;
  mother_name: string | null;
  training_from: string | null;
  training_to: string | null;
  grade: string | null;
}

const VERIFY_BASE_URL = "https://www.siat.in/verify";

const generateCertNumber = () => {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SIAT-${year}-${rand}`;
};

const formatDateDDMMYYYY = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

const CertificateManager = () => {
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


  const getVerifyUrl = (certNum: string) => {
    return `${VERIFY_BASE_URL}?cert=${encodeURIComponent(certNum)}`;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !courseName.trim()) {
      toast.error("Student name and course are required.");
      return;
    }
    setSaving(true);
    try {
      const verifyUrl = getVerifyUrl(certNumber);
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 400, margin: 2, color: { dark: "#1a1a2e", light: "#ffffff" },
      });

      const qrBlob = await (await fetch(qrDataUrl)).blob();
      const qrFileName = `qr-${certNumber.replace(/\//g, "_")}.png`;
      await supabase.storage.from("certificates").upload(qrFileName, qrBlob, { contentType: "image/png", upsert: true });
      const { data: qrUrl } = supabase.storage.from("certificates").getPublicUrl(qrFileName);

      const { error } = await supabase.from("certificates").insert({
        certificate_number: certNumber,
        student_name: studentName.trim(),
        course_name: courseName.trim(),
        issue_date: issueDate,
        expiry_date: expiryDate || null,
        qr_code_url: qrUrl.publicUrl,
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
        toast.success("Certificate created! QR & Barcode ready for download.");
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

  const downloadQR = async (cert: Certificate) => {
    const verifyUrl = getVerifyUrl(cert.certificate_number);
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 600, margin: 2, color: { dark: "#1a1a2e", light: "#ffffff" },
    });
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR-${cert.certificate_number.replace(/\//g, "_")}.png`;
    link.click();
    toast.success("QR Code downloaded!");
  };

  const downloadBarcode = (cert: Certificate) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, cert.certificate_number, {
      format: "CODE128",
      width: 3,
      height: 80,
      displayValue: true,
      fontSize: 16,
      margin: 10,
      background: "#ffffff",
      lineColor: "#1a1a1a",
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `Barcode-${cert.certificate_number.replace(/\//g, "_")}.png`;
    link.click();
    toast.success("Barcode downloaded!");
  };

  const handleToggleValid = async (cert: Certificate) => {
    const { error } = await supabase
      .from("certificates")
      .update({ is_valid: !cert.is_valid })
      .eq("id", cert.id);
    if (error) toast.error("Update failed: " + error.message);
    else { toast.success(`Certificate ${!cert.is_valid ? "activated" : "revoked"}.`); }
  };

  return (
    <div className="space-y-8">
      {/* Create Certificate */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Create Certificate
          </h3>
        </div>

          <form onSubmit={handleCreate} className="space-y-4 border-t border-border pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Certificate Number</label>
                <div className="flex gap-2">
                  <input type="text" value={certNumber} onChange={(e) => setCertNumber(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground font-mono" required />
                  <button type="button" onClick={() => setCertNumber(generateCertNumber())}
                    className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80">Generate</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Student Name *</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Full name" maxLength={100} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Father's Name</label>
                <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Father's name" maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Mother's Name</label>
                <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Mother's name" maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Course Name *</label>
                <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="e.g. Python" maxLength={150} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Grade</label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground">
                  <option value="A++">A++</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Training From</label>
                <input type="date" value={trainingFrom} onChange={(e) => setTrainingFrom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Training To</label>
                <input type="date" value={trainingTo} onChange={(e) => setTrainingTo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Issue Date *</label>
                <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Expiry Date (optional)</label>
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary-glow !py-2.5 !px-6 flex items-center gap-2">
              <QrCode className="w-4 h-4" /> {saving ? "Generating..." : "Create Certificate + Generate QR & Barcode"}
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

export default CertificateManager;
