import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicyPage = () => (
  <>
    <SEOHead title="Privacy Policy – SIAT" description="SIAT privacy policy. How we collect, use, and protect your personal information." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Privacy <span className="gradient-text">Policy</span>
        </motion.h1>
        <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto space-y-8">
        {[
          { title: "Information We Collect", content: "Hum aapka naam, phone number, email address aur course interest collect karte hain jab aap humse contact form, WhatsApp, ya phone ke through sampark karte hain. Website par cookies bhi use hoti hain analytics ke liye." },
          { title: "How We Use Your Information", content: "Aapki jaankari ka use sirf aapko better service dene ke liye hota hai — course information bhejne, admission process mein madad karne, aur placement support dene ke liye. Hum aapki jaankari kisi third party ko nahi bechte." },
          { title: "Data Security", content: "Hum aapke data ki security ke liye appropriate measures lete hain. Website SSL encrypted hai aur data secure servers par store hota hai." },
          { title: "Cookies", content: "Humari website cookies use karti hai browsing experience improve karne aur analytics ke liye. Aap apne browser settings mein cookies disable kar sakte hain." },
          { title: "Third-Party Services", content: "Hum Google Analytics, WhatsApp Business, aur similar services use karte hain. In services ki apni privacy policies hain." },
          { title: "Your Rights", content: "Aap apni personal information ka access, correction, ya deletion request kar sakte hain. Iske liye humse contact karein." },
          { title: "Children's Privacy", content: "Hum jaanboojhkar 13 saal se chhote bachchon ki jaankari collect nahi karte. Agar aapko lagta hai ki kisi bachche ki jaankari humre paas hai, toh humse contact karein." },
          { title: "Changes to This Policy", content: "Hum is privacy policy ko samay-samay par update kar sakte hain. Changes is page par post ki jaayengi." },
          { title: "Contact Us", content: "Privacy se related koi bhi sawaal ho toh humse contact karein: siatgroup.sws@gmail.com" },
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

export default PrivacyPolicyPage;
