import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Brain, Bot, BarChart3, Cog } from "lucide-react";

const faqs = [
  { q: "What AI services does RH Software offer?", a: "We offer AI chatbot development, process automation, predictive analytics, computer vision, NLP solutions, and custom AI model development." },
  { q: "How can AI help my business?", a: "AI can automate repetitive tasks, improve customer service with chatbots, provide data-driven insights, and reduce operational costs by 30–60%." },
  { q: "How much does AI development cost?", a: "AI solutions start from ₹1,00,000 for basic chatbots. Custom AI models and complex automation solutions range from ₹3,00,000–₹15,00,000+." },
  { q: "Do you provide AI solutions for small businesses?", a: "Yes, we offer affordable AI packages for small businesses including chatbots, automated customer support, and basic analytics tools." },
  { q: "How long does AI development take?", a: "Simple AI chatbots take 2–4 weeks. Complex AI solutions with custom models take 2–6 months depending on requirements." },
  { q: "Do you use existing AI models or build custom ones?", a: "We use both approaches — leveraging existing models (GPT, Gemini) for quick deployment and building custom models when specific domain expertise is needed." },
];

const services = [
  "AI Chatbot Development",
  "Business Process Automation",
  "Predictive Analytics & Insights",
  "Natural Language Processing (NLP)",
  "Computer Vision Solutions",
  "AI-Powered Customer Support",
  "Document Processing & OCR",
  "Recommendation Systems",
  "Custom AI Model Training",
  "AI Integration & API Development",
];

const AIDevelopmentPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">RH Software</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            AI Development Company <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            RH Software — Bihar's first AI development company. Chatbots, automation, predictive analytics — apne business ko AI-powered banayein.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"AI se business ko smart banayein — automation aur intelligence ka naya daur!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Get a Quote</Link>
            <Link to="/rh-software/portfolio" className="btn-outline-glow">View Portfolio</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">RH Software for AI?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "AI Expertise", desc: "Experienced team in ML, NLP, and computer vision" },
              { icon: Bot, title: "Smart Chatbots", desc: "AI chatbots that understand and respond naturally" },
              { icon: BarChart3, title: "Data Analytics", desc: "Turn data into actionable business insights" },
              { icon: Cog, title: "Automation", desc: "Reduce manual work by 60% with intelligent automation" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><item.icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">AI <span className="gradient-text">Services</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s) => (<div key={s} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{s}</span></div>))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
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

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/rh-software/website-development-company-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">Website Development</Link>
            <Link to="/rh-software/app-development-company-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">App Development</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIDevelopmentPage;
