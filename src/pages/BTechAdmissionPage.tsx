import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Code, Building, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const branches = ["Computer Science Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics & Communication", "Information Technology"];
const colleges = ["NIT Patna", "IIT Patna", "BIT Mesra", "Muzaffarpur Institute of Technology", "Bihar Engineering University", "LNMU Engineering Faculty"];

const faqs = [
  { q: "Bihar mein B.Tech ke liye best colleges kaunse hain?", a: "NIT Patna, IIT Patna, BIT Mesra, MIT Muzaffarpur Bihar ke top engineering colleges hain. State level entrance ke through bhi achhe colleges mein admission milta hai." },
  { q: "B.Tech admission ke liye kya eligibility hai?", a: "12th mein Physics, Chemistry aur Maths hona chahiye with minimum 50-60% marks (college ke hisaab se). JEE Main ya state entrance exam qualify karna hota hai." },
  { q: "B.Tech ki fees kitni hoti hai Bihar mein?", a: "Government colleges mein ₹50,000-₹1,50,000 per year. Private colleges mein ₹1-3 lakh per year. Student Credit Card se fees ka loan bhi mil sakta hai." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const BTechAdmissionPage = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consultancy Services</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          B.Tech Admission <span className="gradient-text">in Bihar</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Engineering mein career banayein — Bihar ke top B.Tech colleges mein admission guidance. JEE preparation tips, counseling support aur complete admission process.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Admission Guidance</Link>
          <Link to="/consultancy-services/bihar-student-credit-card-admission" className="btn-outline-glow">Student Credit Card</Link>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Popular <span className="gradient-text">Branches</span></h2>
          <div className="space-y-3">
            {branches.map((b) => (<div key={b} className="flex items-center gap-3 glass-card p-4"><Code className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{b}</span></div>))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Top <span className="gradient-text">Colleges</span></h2>
          <div className="space-y-3">
            {colleges.map((c) => (<div key={c} className="flex items-center gap-3 glass-card p-4"><Building className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{c}</span></div>))}
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">B.Tech Admission — Complete Guide</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>B.Tech (Bachelor of Technology) 4 saal ka engineering degree program hai. Bihar mein kai achhe engineering colleges hain jahan se quality education milti hai. SIAT Consultancy aapko sahi college choose karne aur admission process mein madad karta hai.</p>
          <p>JEE Main ke through NIT Patna, IIT Patna jaise top colleges mein admission milta hai. State level entrance exams ke through bhi Bihar ke government engineering colleges mein admission hota hai. Private colleges mein direct admission bhi possible hai.</p>
          <p>Bihar Student Credit Card scheme ke through B.Tech ki fees ke liye ₹4 lakh tak ka loan mil sakta hai — 0% interest par. SIAT isme bhi guidance deta hai.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="glass-card p-6 group cursor-pointer">
              <summary className="font-display font-bold text-foreground list-none flex items-center justify-between">{faq.q}<span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span></summary>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default BTechAdmissionPage;
