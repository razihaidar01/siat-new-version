import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
// ... keep existing code
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
