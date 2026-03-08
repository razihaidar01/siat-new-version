import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const DisclaimerPage = () => (
  <>
    <SEOHead title="Disclaimer – SIAT" description="SIAT website disclaimer. Information accuracy, external links, and limitation of liability." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          <span className="gradient-text">Disclaimer</span>
        </motion.h1>
        <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto space-y-8">
        {[
          { title: "General Disclaimer", content: "SIAT ki website par di gayi jaankari sirf general information ke liye hai. Hum jaankari ko accurate aur updated rakhne ki koshish karte hain, lekin hum iske completeness, accuracy, ya reliability ki guarantee nahi dete." },
          { title: "No Guarantee of Results", content: "Training courses ke results individual effort, aptitude, aur market conditions par depend karte hain. SIAT kisi specific outcome ya placement ki guarantee nahi deta." },
          { title: "External Links", content: "Humari website par external websites ke links ho sakte hain. Hum in external websites ke content ke liye zimmedar nahi hain." },
          { title: "Course Information", content: "Course content, fees, aur schedules samay-samay par badal sakte hain. Latest information ke liye hamesha humse directly confirm karein." },
          { title: "Professional Advice", content: "Website par di gayi jaankari professional advice ka replacement nahi hai. Important decisions lene se pehle relevant professionals se consult karein." },
          { title: "Testimonials", content: "Website par dikhaye gaye testimonials real students ke experiences hain. Individual results vary kar sakte hain." },
          { title: "Limitation of Liability", content: "SIAT, uske directors, employees, ya agents kisi bhi direct, indirect, incidental, ya consequential damages ke liye liable nahi hain jo humari website ya services ke use se ho sakte hain." },
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

export default DisclaimerPage;
