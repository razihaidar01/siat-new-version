import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building, Monitor, Wrench, BookOpen, Wifi, Shield } from "lucide-react";

const facilities = [
  { icon: Monitor, title: "Computer Lab", desc: "30+ computers with latest software — programming, Tally, internet training ke liye." },
  { icon: Wrench, title: "Mobile Repair Lab", desc: "Advanced tools — microscope, soldering station, BGA rework machine ke saath fully-equipped lab." },
  { icon: Building, title: "AC Training Lab", desc: "Real split AC, window AC, inverter AC units par hands-on practice." },
  { icon: Monitor, title: "Laptop Repair Lab", desc: "Motherboard repair tools, diagnostic equipment aur testing stations." },
  { icon: Shield, title: "CCTV Lab", desc: "Different types ke cameras, DVR/NVR systems aur networking equipment." },
  { icon: BookOpen, title: "Classroom", desc: "AC classrooms with projector, whiteboard aur comfortable seating." },
  { icon: Wifi, title: "High-Speed Internet", desc: "Campus-wide Wi-Fi for research, online learning aur practice." },
  { icon: Building, title: "Library", desc: "Technical books, manuals, aur study materials ka collection." },
];

const InfrastructurePage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Our <span className="gradient-text">Infrastructure</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT ki modern infrastructure dekhein — state-of-the-art labs, classrooms aur facilities jo students ko best learning experience deti hain.
        </motion.p>
        <Link to="/gallery" className="btn-primary-glow">See Gallery</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><f.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding text-center" style={{ background: "var(--gradient-section)" }}>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/gallery" className="btn-outline-glow !py-3 !px-5 !text-sm">Photo Gallery</Link>
        <Link to="/training-institute" className="btn-outline-glow !py-3 !px-5 !text-sm">Our Courses</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Visit SIAT</Link>
      </div>
    </section>
  </>
);

export default InfrastructurePage;
