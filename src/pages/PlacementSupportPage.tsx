import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Building2, Users, TrendingUp, CheckCircle, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const steps = [
  { num: "01", title: "Course Completion", desc: "Successfully complete your chosen course with practical assessment." },
  { num: "02", title: "Resume Building", desc: "Hamare experts aapka professional resume banane mein madad karte hain." },
  { num: "03", title: "Interview Preparation", desc: "Mock interviews aur soft skills training se interview-ready banein." },
  { num: "04", title: "Job Placement", desc: "Hamare industry partners ke saath connect hoke apni dream job paayein." },
];

const partners = ["Samsung Service Center", "MI Service Center", "Oppo Service Center", "Local Electronics Shops", "IT Companies", "Government Offices", "CCTV Installation Companies", "AC Service Companies"];

const PlacementSupportPage = () => (
  <>
    <SEOHead title="Placement Support – SIAT Training Institute Bihar" description="95% placement rate at SIAT. Dedicated placement cell connecting graduates with Samsung, MI, Oppo service centers and IT companies across Bihar." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Placement <span className="gradient-text">Support</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Dedicated placement cell jo course complete hone ke baad aapko job dhundhne mein poori madad karta hai. 95% placement success rate!
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Get Placed</Link>
      </div>
    </section>

    <section className="py-12 bg-primary/5 border-y border-border/50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[{ v: "95%", l: "Placement Rate" }, { v: "50+", l: "Partner Companies" }, { v: "5000+", l: "Students Placed" }, { v: "₹12K+", l: "Avg Starting Salary" }].map((s) => (
          <div key={s.l}><div className="text-3xl font-display font-black text-primary">{s.v}</div><div className="text-sm text-muted-foreground mt-1">{s.l}</div></div>
        ))}
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Placement <span className="gradient-text">Process</span></h2>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="glass-card p-6 flex items-start gap-4">
              <span className="text-3xl font-display font-black text-primary/30">{s.num}</span>
              <div><h3 className="font-display font-bold text-foreground mb-1">{s.title}</h3><p className="text-sm text-muted-foreground">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Our <span className="gradient-text">Placement Partners</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p} className="glass-card p-4 text-center"><span className="text-sm text-foreground font-medium">{p}</span></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">SIAT Placement Cell — Aapki Job Humari Zimmedari</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>SIAT ka dedicated placement cell har student ke career ko seriously leta hai. Course complete hone ke baad, hum aapko job dhundhne mein poori madad karte hain — resume building, interview prep, aur company connections sab shamil hai.</p>
          <p>Hamare 50+ industry partners hain jo regularly hamare students ko hire karte hain. Bihar ke andar aur bahar — Delhi, Mumbai, Bangalore, Hyderabad — hamare alumni successful careers bana rahe hain.</p>
          <p>Jo students apna khud ka business start karna chahte hain, unke liye bhi hum guidance dete hain — shop setup, equipment purchase, marketing tips sab ke liye support milta hai.</p>
        </div>
      </div>
    </section>

    <section className="section-padding text-center" style={{ background: "var(--gradient-section)" }}>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/training-institute" className="btn-outline-glow !py-3 !px-5 !text-sm">View Courses</Link>
        <Link to="/training-institute/student-testimonials" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Reviews</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default PlacementSupportPage;
