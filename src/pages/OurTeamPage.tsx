import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const team = [
  { name: "Chairman", role: "Founder & Chairman", desc: "SIAT ki vision aur direction ka neta — 15+ years ka experience." },
  { name: "Director", role: "Managing Director", desc: "Operations aur strategic planning ke head." },
  { name: "Academic Head", role: "Head of Training", desc: "Curriculum development aur training quality ke incharge." },
  { name: "Placement Officer", role: "Placement Cell Head", desc: "Student placements aur industry connections manage karte hain." },
  { name: "Senior Trainer – Mobile", role: "Mobile Repair Expert", desc: "10+ years ka chip-level repair experience." },
  { name: "Senior Trainer – AC", role: "AC & Refrigeration Expert", desc: "HVAC specialist with industry certifications." },
  { name: "IT Head", role: "Technology & IT", desc: "Website, software, aur digital infrastructure manage karte hain." },
  { name: "Admin Officer", role: "Administration", desc: "Day-to-day operations aur student support handle karte hain." },
];

const OurTeamPage = () => (
  <>
    <SEOHead title="Our Team – SIAT Bihar" description="Meet the dedicated team behind SIAT. Experienced trainers, management, and support staff committed to quality education." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Our <span className="gradient-text">Team</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT ki experienced aur dedicated team se milein — jo har din students ka future build karne mein lagi rehti hai.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">{t.name}</h3>
              <p className="text-xs text-primary font-medium mt-1">{t.role}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding text-center" style={{ background: "var(--gradient-section)" }}>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Join Our Team!</h2>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Agar aap experienced trainer hain ya education sector mein kaam karna chahte hain — humse contact karein.</p>
      <Link to="/contact-us" className="btn-primary-glow">Contact Us</Link>
    </section>
  </>
);

export default OurTeamPage;
