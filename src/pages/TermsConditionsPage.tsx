import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const TermsConditionsPage = () => (
  <>
    <SEOHead title="Terms & Conditions – SIAT" description="Terms and conditions for using SIAT services, training programs, and website." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Terms & <span className="gradient-text">Conditions</span>
        </motion.h1>
        <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto space-y-8">
        {[
          { title: "Acceptance of Terms", content: "SIAT ki website use karke aur services avail karke aap in terms & conditions se agree karte hain. Agar aap in terms se agree nahi karte, toh please humari services use na karein." },
          { title: "Services", content: "SIAT technical training courses, consultancy services, aur software development services (RH Software ke through) provide karta hai. Services ki details respective pages par available hain." },
          { title: "Admission & Enrollment", content: "Admission subject to availability hai. SIAT ko admission reject karne ka adhikaar hai. Enrollment complete tabhi maana jaayega jab saare required documents aur fees submit ho jaayein." },
          { title: "Fees & Refund Policy", content: "Course fees advance mein ya installments mein pay karni hoti hai. Ek baar admission lene ke baad fees refundable nahi hai, except in exceptional circumstances jo management decide karega." },
          { title: "Certificate Issuance", content: "Certificates sirf un students ko issue kiye jaate hain jinone course successfully complete kiya hai aur saari fees clear ki hai. Certificates ki verification online available hai." },
          { title: "Intellectual Property", content: "SIAT ki website par sab content — text, images, logos — SIAT ki property hai. Bina permission ke copy ya reproduce karna prohibited hai." },
          { title: "Limitation of Liability", content: "SIAT placement guarantee nahi deta. Hum best efforts se placement support provide karte hain lekin actual placement company aur candidate ke beech ka matter hai." },
          { title: "Website Use", content: "SIAT ki website ka misuse — hacking, spam, unauthorized access — strictly prohibited hai. Aisi activity karne par legal action liya ja sakta hai." },
          { title: "Governing Law", content: "Ye terms & conditions India ke laws ke under governed hain. Koi bhi dispute Saharsa, Bihar ke courts mein resolve hoga." },
          { title: "Contact", content: "Terms se related koi bhi sawaal ho toh humse contact karein: siatgroup.sws@gmail.com" },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default TermsConditionsPage;
