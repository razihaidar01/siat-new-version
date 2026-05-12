import SEOHead from "@/components/SEOHead";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, ShieldCheck, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import siatLogo from "@/assets/siat-logo.png";

const VerifyCertificatePage = () => {
  const [searchParams] = useSearchParams();
  const [certNumber, setCertNumber] = useState(searchParams.get("cert") || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchParams.get("cert")) {
      handleVerify(undefined, searchParams.get("cert")!);
    }
  }, []);

  const handleVerify = async (e?: React.FormEvent, certNum?: string) => {
    e?.preventDefault();
    const num = certNum || certNumber.trim();
    if (!num) return;
    setCertNumber(num);
    setLoading(true);
    setSearched(true);
    setDocUrl(null);

    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_number", num)
      .maybeSingle();

    setResult(data);

    // Check for matching document (private certificate document)
    if (data) {
      const { data: doc } = await supabase.rpc("get_certificate_document_url", { cert_number: num });
      if (doc) setDocUrl(doc);
    }

    setLoading(false);
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
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <h3 className="text-xl font-display font-bold text-green-700">Certificate Verified ✓</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      ["Certificate No.", result.certificate_number],
                      ["Student Name", result.student_name],
                      ["Father's Name", result.father_name],
                      ["Mother's Name", result.mother_name],
                      ["Course", result.course_name],
                      ["Grade", result.grade],
                      ["Issue Date", result.issue_date],
                      ["Training From", result.training_from],
                      ["Training To", result.training_to],
                    ].map(([label, value]) => value && (
                      <div key={label} className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`font-bold ${result.is_valid ? "text-green-600" : "text-red-600"}`}>
                        {result.is_valid ? "Valid ✓" : "Expired ✗"}
                      </span>
                    </div>
                  </div>

                  {/* SIAT Verified Badge */}
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20 flex items-center gap-4">
                    <img src={siatLogo} alt="SIAT" className="w-14 h-14 rounded-full" />
                    <div>
                      <p className="font-display font-bold text-primary text-lg">SIAT VERIFIED</p>
                      <p className="text-xs text-muted-foreground">This certificate is authenticated by SIAT, Bihar</p>
                      <p className="text-xs text-muted-foreground">Director: Md Parwez Alam</p>
                    </div>
                  </div>

                  {/* Document download */}
                  {docUrl && (
                    <a href={docUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-2 text-primary font-medium text-sm hover:underline">
                      <Download className="w-4 h-4" /> View / Download Certificate Document
                    </a>
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
