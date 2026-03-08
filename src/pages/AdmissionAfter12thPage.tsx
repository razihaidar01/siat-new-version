import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Stethoscope, Code, Heart, Briefcase, TrendingUp } from "lucide-react";

const options = [
  { icon: Stethoscope, title: "Medical (MBBS/BDS)", desc: "NEET clear karke doctor banein. Bihar ke top medical colleges mein admission.", href: "/consultancy-services/mbbs-admission-bihar" },
  { icon: Code, title: "Engineering (B.Tech/BE)", desc: "JEE se NIT/IIT mein admission. State entrance se bhi options.", href: "/consultancy-services/btech-admission-bihar" },
  { icon: GraduationCap, title: "BCA/IT Courses", desc: "Computer science mein interest? BCA se IT career start karein.", href: "/consultancy-services/bca-college-bihar" },
  { icon: Heart, title: "Nursing (ANM/GNM/B.Sc)", desc: "Healthcare sector mein rewarding career. Demand always high.", href: "/consultancy-services/nursing-college-bihar" },
  { icon: Briefcase, title: "Skill-Based Courses", desc: "Quick job chahiye? Technical skill courses se 3-6 months mein job-ready.", href: "/training-institute" },
  { icon: TrendingUp, title: "B.Com/BBA/MBA Path", desc: "Business aur commerce mein career. Banking, finance, management.", href: "/consultancy-services/best-college-in-bihar" },
];

const AdmissionAfter12thPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Career Guidance</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Admission After 12th <span className="gradient-text">in Bihar</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          12th ke baad kya karein? Best career options aur admission guidance — SIAT Consultancy se paayein personalized counseling. Science, Commerce, ya Arts — sabke liye options hain.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Free Counseling</Link>
          <Link to="/consultancy-services/bihar-student-credit-card-admission" className="btn-outline-glow">Student Credit Card</Link>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Career <span className="gradient-text">Options</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((o, i) => (
            <motion.div key={o.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Link to={o.href} className="block glass-card-hover p-6 h-full group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><o.icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{o.title}</h3>
                <p className="text-sm text-muted-foreground">{o.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">12th Ke Baad Career Planning — Expert Guide</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>12th pass karna ek bada milestone hai — lekin usse bhi bada challenge hai sahi career path choose karna. Bahut saare students confuse rehte hain ki kya karein — MBBS, B.Tech, BCA, ya koi aur course?</p>
          <p>SIAT Consultancy mein hum har student ko personalized counseling dete hain. Aapke marks, interest, family situation aur career goals — sab ko dhyan mein rakhkar hum best options suggest karte hain.</p>
          <p>Bihar Student Credit Card scheme ke through ₹4 lakh tak ka education loan 0% interest par mil sakta hai — toh fees ki tension nahi leni chahiye. SIAT isme bhi complete guidance deta hai.</p>
          <p>Agar aap Bihar mein rehkar padhai karna chahein ya bahar jaana chahein — dono options ke liye hum guidance dete hain. Important baat ye hai ki jaldi decision lein — admissions ke dates miss nahi hone chahiye!</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/consultancy-services" className="btn-outline-glow !py-3 !px-5 !text-sm">All Services</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Get Counseling</Link>
      </div>
    </section>
  </>
);

export default AdmissionAfter12thPage;
