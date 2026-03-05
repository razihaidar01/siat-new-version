import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import siatSeal from "@/assets/cert-siat-seal.png";

const formatDate = (d: string | null) => {
  if (!d) return null;
  const dt = new Date(d);
  return `${String(dt.getDate()).padStart(2, "0")}-${String(dt.getMonth() + 1).padStart(2, "0")}-${dt.getFullYear()}`;
};

const VerifyCertificatePage = () => {
  const [searchParams] = useSearchParams();
  const [certNumber, setCertNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const id = searchParams.get("cert") || searchParams.get("id");
    if (id) {
      setCertNumber(id);
      verifyNumber(id);
    }
  }, [searchParams]);

  const verifyNumber = async (number: string) => {
    if (!number.trim()) return;
    setLoading(true);
    setSearched(true);
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_number", number.trim())
      .maybeSingle();
    setResult(data);
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    verifyNumber(certNumber);
  };

  const DetailRow = ({ label, value }: { label: string; value: string | null | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex justify-between py-2 border-b border-border">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}</span>
      </div>
    );
  };

  return (
    <>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6">
              Verify <span className="gradient-text">Certificate</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Apna SIAT certificate verify karein — certificate number enter karein aur authenticity check karein.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleVerify} className="glass-card p-8 space-y-4">
            <label className="text-sm font-medium text-foreground block">Certificate Number</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                placeholder="e.g. SIAT/2015-16/113"
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                required
              />
              <button type="submit" disabled={loading} className="btn-primary-glow !py-3 !px-5 flex items-center gap-2">
                <Search className="w-4 h-4" />
                {loading ? "Checking..." : "Verify"}
              </button>
            </div>
          </form>

          {searched && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              {result ? (
                <div className="glass-card p-8 border-2 border-green-500/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <h3 className="text-xl font-display font-bold text-green-700">Certificate Verified ✓</h3>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <DetailRow label="Certificate No." value={result.certificate_number} />
                    <DetailRow label="Student Name" value={result.student_name} />
                    <DetailRow label="Father's Name" value={result.father_name} />
                    <DetailRow label="Mother's Name" value={result.mother_name} />
                    <DetailRow label="Course" value={result.course_name} />
                    <DetailRow label="Grade" value={result.grade} />
                    <DetailRow label="Issue Date" value={formatDate(result.issue_date)} />
                    <DetailRow label="Training From" value={formatDate(result.training_from)} />
                    <DetailRow label="Training To" value={formatDate(result.training_to)} />
                    {result.expiry_date && <DetailRow label="Valid Until" value={formatDate(result.expiry_date)} />}
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`font-bold ${result.is_valid ? "text-green-600" : "text-red-600"}`}>
                        {result.is_valid ? "Valid ✓" : "Revoked ✗"}
                      </span>
                    </div>
                  </div>

                  {/* SIAT Verified Badge */}
                  {result.is_valid && (
                    <div className="mt-6 flex justify-center">
                      <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-primary/20 bg-primary/5">
                        <img src={siatSeal} alt="SIAT Seal" className="w-20 h-20 object-contain" />
                        <div className="text-center">
                          <p className="text-xs font-bold text-primary tracking-widest uppercase">SIAT Verified</p>
                          <p className="text-[10px] text-muted-foreground">Authentic Certificate</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass-card p-8 border-2 border-red-500/30 text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-red-700 mb-2">Certificate Not Found</h3>
                  <p className="text-sm text-muted-foreground">Yeh certificate number hamare records mein nahi mila. Kripya sahi number enter karein ya humse contact karein.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default VerifyCertificatePage;
