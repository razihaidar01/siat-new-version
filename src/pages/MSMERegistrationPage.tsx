import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileCheck, CheckCircle, TrendingUp, Shield } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const benefits = ["Government tender eligibility", "Bank loan easy approval", "Tax benefits under MSME Act", "Subsidized patent & trademark", "Technology & marketing support", "Priority sector lending"];
const process = ["Udyam Registration portal par jaayein", "Aadhar number enter karein", "Business details bharein", "OTP verification", "Certificate download karein"];

const MSMERegistrationPage = () => (
  <>
    <SEOHead title="MSME Registration – SIAT Business Services Bihar" description="Get MSME/Udyam registration with SIAT. Government tender eligibility, tax benefits, and subsidized services for businesses in Bihar." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Business Services</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          MSME/Udyam <span className="gradient-text">Registration</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          MSME/Udyam registration se government benefits paayein — tender eligibility, tax benefits, subsidized loans aur bahut kuch. SIAT se karwayein hassle-free registration.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Register Now</Link>
          <Link to="/consultancy-services/iso-certification-bihar" className="btn-outline-glow">ISO Certification</Link>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">MSME <span className="gradient-text">Benefits</span></h2>
          <div className="space-y-3">
            {benefits.map((b) => (<div key={b} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{b}</span></div>))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Registration <span className="gradient-text">Process</span></h2>
          <div className="space-y-3">
            {process.map((p, i) => (
              <div key={i} className="flex items-start gap-4 glass-card p-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">{i + 1}</span>
                <span className="text-foreground text-sm font-medium pt-1">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">MSME Registration — Business Growth Ka First Step</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>MSME (Micro, Small & Medium Enterprises) registration — ab Udyam Registration ke naam se jaana jaata hai — bharat mein chhote aur madhyam businesses ke liye ek zaroori registration hai. Ye registration aapko bahut saare government benefits ke liye eligible banata hai.</p>
          <p>MSME registration ke baad aap government tenders mein participate kar sakte hain, banks se easy loans le sakte hain, tax benefits pa sakte hain, aur bahut saari government schemes ka fayda utha sakte hain.</p>
          <p>SIAT Consultancy MSME/Udyam registration mein complete assistance deta hai. Hum documentation se lekar final certificate tak ka pura process handle karte hain — aapko sirf basic details dene hote hain.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/consultancy-services" className="btn-outline-glow !py-3 !px-5 !text-sm">All Services</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default MSMERegistrationPage;
