import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const faqs = [
  { q: "SIAT kya hai?", a: "SIAT (Saharsa Institute of Advanced Technology) Bihar ka leading technical training institute hai. Hum mobile repairing, AC repairing, laptop repairing, CCTV installation aur short-term job courses provide karte hain. Saath hi RH Software ke through web, app, AI development services bhi dete hain." },
  { q: "SIAT mein admission kaise lein?", a: "SIAT mein admission ke liye humse phone ya WhatsApp par contact karein, ya directly institute visit karein. Admission process simple hai — course select karein, documents submit karein, fees pay karein aur training shuru!" },
  { q: "Kya placement guaranteed hai?", a: "SIAT 100% placement guarantee nahi deta, lekin hamare dedicated placement cell ki wajah se 95% students ko course ke baad job milti hai. Hum resume building, interview preparation aur industry connections provide karte hain." },
  { q: "Course ki fees kitni hai?", a: "Fees course aur duration ke hisaab se alag hoti hai — ₹5,000 se ₹18,000 tak. EMI option bhi available hai. Details ke liye Course Fees page dekhein." },
  { q: "Kya certificate milta hai?", a: "Haan! SIAT ISO-verified certificate deta hai jismein QR code hota hai. Employer ya koi bhi online verify kar sakta hai humari website par." },
  { q: "Course ki duration kitni hai?", a: "Courses 1 mahine se 6 mahine tak ke hain. Short-term courses 1-3 mahine ke hote hain, advanced courses 3-6 mahine ke." },
  { q: "Kya hostel facility hai?", a: "SIAT ke campus mein hostel nahi hai, lekin hum nearby affordable hostel/PG ki recommendation karte hain bahar ke students ke liye." },
  { q: "Kya online classes available hain?", a: "Hamare courses primarily hands-on practical training par focused hain isliye offline classes zaroori hain. Lekin kuch theoretical parts ke online resources available hain." },
  { q: "Kya koi age limit hai?", a: "Nahi, koi age limit nahi hai. 15 saal se lekar 50+ saal tak ke students hamare courses join kar sakte hain." },
  { q: "RH Software kya services deta hai?", a: "RH Software — SIAT ki IT division — website development, app development, AI solutions, aur custom software engineering services provide karta hai. Details ke liye RH Software page visit karein." },
  { q: "Certificate verify kaise karein?", a: "Humari website par Verify Certificate page par jaayein, certificate number enter karein, aur instantly verify karein. QR code scan karke bhi verify kar sakte hain." },
  { q: "ISO certification services available hain?", a: "Haan, SIAT Consultancy ISO 9001, 14001, 45001 aur other ISO certifications mein businesses ki madad karta hai." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const FAQsPage = () => (
  <>
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
