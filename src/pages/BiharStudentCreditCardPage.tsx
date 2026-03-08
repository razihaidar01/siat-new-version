import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CreditCard, CheckCircle, FileText } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const benefits = ["₹4 lakh tak education loan", "0% interest rate", "No collateral required", "42 approved courses covered", "Both Bihar aur bahar ke colleges", "Simple online application process"];
const documents = ["Aadhar Card (Student + Parents)", "12th Marksheet & Certificate", "College Admission Letter", "Family Income Certificate", "Bank Account Details", "Passport Size Photos"];
const steps = ["BSCC portal par online apply karein", "Documents upload karein", "District office verification", "Bank processing & approval", "Direct college ko payment"];

const BiharStudentCreditCardPage = () => (
  <>
    <SEOHead title="Bihar Student Credit Card – SIAT Admission Guide" description="Complete guide to Bihar Student Credit Card scheme. ₹4 lakh education loan at 0% interest. Application process, documents, and eligibility." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Financial Support</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Bihar Student Credit Card <span className="gradient-text">Admission</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Bihar Student Credit Card scheme se padhai karein — ₹4 lakh tak ka education loan 0% interest par. Poori process SIAT se samjhein aur apply karein.
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Apply With SIAT Help</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Scheme <span className="gradient-text">Benefits</span></h2>
          <div className="space-y-3">
            {benefits.map((b) => (<div key={b} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{b}</span></div>))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Required <span className="gradient-text">Documents</span></h2>
          <div className="space-y-3">
            {documents.map((d) => (<div key={d} className="flex items-center gap-3 glass-card p-4"><FileText className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{d}</span></div>))}
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Application <span className="gradient-text">Process</span></h2>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4 glass-card p-4">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">{i + 1}</span>
              <span className="text-foreground text-sm font-medium pt-1">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Bihar Student Credit Card — Complete Guide</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Bihar Student Credit Card (BSCC) Bihar government ki ek revolutionary scheme hai jo garib aur middle class students ko higher education ke liye financial support deti hai. Is scheme ke under ₹4 lakh tak ka education loan milta hai — 0% interest rate par.</p>
          <p>Ye loan 42 approved courses ke liye available hai — MBBS, B.Tech, BCA, Nursing, MBA, B.Sc, BA, B.Com, aur bahut saare aur courses. Bihar ke andar aur bahar ke recognized colleges — dono ke liye applicable hai.</p>
          <p>SIAT Consultancy BSCC application mein complete guidance deta hai — form filling se lekar bank approval tak. Bahut saare students ne hamare through successfully loan paaya hai aur apni padhai puri ki hai.</p>
        </div>
      </div>
    </section>

    <section className="section-padding text-center" style={{ background: "var(--gradient-section)" }}>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/consultancy-services/admission-after-12th-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">After 12th Options</Link>
        <Link to="/consultancy-services" className="btn-outline-glow !py-3 !px-5 !text-sm">All Services</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default BiharStudentCreditCardPage;
