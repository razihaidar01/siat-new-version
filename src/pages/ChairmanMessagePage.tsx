import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const ChairmanMessagePage = () => (
  <>
    <SEOHead title="Chairman's Message – SIAT Bihar" description="Read the Chairman's message about SIAT's vision, mission, and commitment to empowering Bihar's youth through technical education." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Chairman's <span className="gradient-text">Message</span>
        </motion.h1>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-12">
          <Quote className="w-12 h-12 text-primary/20 mb-6" />
          <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
            <p>Pyaare students aur well-wishers,</p>
            <p>SIAT ki sthapna ek sapne ke saath hui thi — Bihar ke youth ko aisi technical skills dena jo unhe aatmanirbhar banaye. Aaj, 10+ saalon baad, mujhe garv hai ki hum 5000+ se zyada students ko successfully train kar chuke hain aur unhe ek behtar future ki raah dikha chuke hain.</p>
            <p>Hamare institute ka mission sirf courses padhana nahi hai — balki har student ko ek confident, skilled professional banana hai jo apne pairon par khada ho sake. Chahein wo job karein ya apna business shuru karein — SIAT unhe har tarah se tayyar karta hai.</p>
            <p>SIAT sirf ek training institute nahi hai — ye ek parivaar hai. Yahan har student ko personal attention milta hai, har doubt clear hota hai, aur har kamiyaabi celebrate hoti hai.</p>
            <p>Hum technology aur innovation ko apnaate hue aage badh rahe hain. RH Software ke through hum AI, web, aur app development mein bhi Bihar ko national level par le jaana chahte hain.</p>
            <p>Aayiye, saath milkar ek skilled aur aatmanirbhar Bihar ka nirman karein!</p>
            <p className="font-display font-bold text-foreground mt-8">— Chairman, SIAT Group</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding text-center" style={{ background: "var(--gradient-section)" }}>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/about-us" className="btn-outline-glow !py-3 !px-5 !text-sm">About SIAT</Link>
        <Link to="/our-team" className="btn-outline-glow !py-3 !px-5 !text-sm">Our Team</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default ChairmanMessagePage;
