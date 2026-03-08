import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, BookOpen, Building, Award, CheckCircle } from "lucide-react";

const programs = [
  { title: "ANM (Auxiliary Nurse Midwifery)", duration: "2 Years", desc: "Basic nursing care aur midwifery ki training." },
  { title: "GNM (General Nursing & Midwifery)", duration: "3.5 Years", desc: "Comprehensive nursing training with hospital practice." },
  { title: "B.Sc Nursing", duration: "4 Years", desc: "Degree-level nursing program with advanced clinical training." },
  { title: "Post Basic B.Sc Nursing", duration: "2 Years", desc: "GNM ke baad degree upgrade karne ke liye." },
];

const NursingCollegePage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consultancy Services</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Nursing College <span className="gradient-text">in Bihar</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Bihar ke top nursing colleges mein admission guidance — ANM, GNM, B.Sc Nursing. Healthcare mein rewarding career banayein.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Admission Help</Link>
          <Link to="/consultancy-services/mbbs-admission-bihar" className="btn-outline-glow">MBBS Admission</Link>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Nursing <span className="gradient-text">Programs</span></h2>
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="glass-card p-6">
              <Heart className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-foreground mb-1">{p.title}</h3>
              <span className="text-xs text-primary font-medium">{p.duration}</span>
              <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Nursing Career — Seva Bhi, Career Bhi</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Nursing healthcare sector ka ek bahut hi important aur rewarding career hai. Bihar mein AIIMS Patna, IGIMS, Nalanda Medical College jaise top institutions mein nursing courses available hain.</p>
          <p>ANM aur GNM diploma-level programs hain jo comparatively kam time mein complete hote hain. B.Sc Nursing 4 saal ka degree program hai jo zyada career options kholta hai — government hospitals, private hospitals, nursing homes, aur abroad opportunities.</p>
          <p>Bihar Student Credit Card scheme ke through nursing courses ki fees ke liye loan bhi available hai. SIAT Consultancy aapko sahi college choose karne aur admission process mein complete support deta hai.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/consultancy-services/best-college-in-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">All Colleges</Link>
        <Link to="/consultancy-services/bihar-student-credit-card-admission" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Credit Card</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default NursingCollegePage;
