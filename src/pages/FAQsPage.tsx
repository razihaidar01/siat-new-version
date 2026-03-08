import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const faqs = [
  { q: "SIAT kya hai?", a: "SIAT (Society for Industrial & Applied Training) Bihar ka leading training institute, IT company aur consultancy organization hai — Saharsa mein headquartered." },
  { q: "Kaunse courses available hain?", a: "Mobile Repairing, AC Repairing, Laptop Repairing, CCTV Installation, aur short-term job-oriented courses available hain." },
  { q: "Course ki fees kitni hai?", a: "Course fees ₹5,000 se ₹35,000 tak hoti hai depending on course type aur duration. EMI facility bhi available hai." },
  { q: "Certificate milta hai?", a: "Haan, ISO-verified certificate milta hai jismein QR code hota hai — employers online verify kar sakte hain." },
  { q: "Placement support milta hai?", a: "Haan, SIAT ka dedicated placement cell hai — 95% placement rate ke saath Samsung, MI, Oppo service centers mein placement." },
  { q: "Online classes available hain?", a: "Currently SIAT offline practical-based training par focus karta hai. Kuch theory modules online bhi available hain." },
  { q: "Admission kaise lein?", a: "Contact form fill karein, WhatsApp karein, ya directly SIAT Saharsa office visit karein. Walk-in admission bhi available hai." },
  { q: "Kya hostel facility hai?", a: "SIAT nearby affordable hostel aur PG accommodations suggest karta hai students ke liye." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const FAQsPage = () => (
  <>
    <SEOHead title="FAQs – SIAT Training Institute Bihar" description="Frequently asked questions about SIAT training courses, fees, placement, certificates, and admission process in Bihar." />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Frequently Asked <span className="gradient-text">Questions</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT ke baare mein aksar poochhe jaane wale sawaal — sabhi jawab yahan milenge.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto">
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

    <section className="section-padding text-center" style={{ background: "var(--gradient-section)" }}>
      <h2 className="text-2xl font-display font-bold text-foreground mb-4">Aur Koi Sawaal?</h2>
      <p className="text-muted-foreground mb-6">Agar aapka sawaal yahan nahi mila toh humse directly puchh sakte hain.</p>
      <Link to="/contact-us" className="btn-primary-glow">Contact Us</Link>
    </section>
  </>
);

export default FAQsPage;
