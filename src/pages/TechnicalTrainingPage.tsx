import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, BookOpen, Award, Users, Wrench, CheckCircle } from "lucide-react";

const TechnicalTrainingPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Technical Training Institute <span className="gradient-text">in Saharsa, Bihar</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Saharsa ka sabse achha technical training institute — SIAT mein modern labs, experienced faculty aur hands-on practical training ke saath apna technical career shuru karein.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Visit SIAT</Link>
          <Link to="/training-institute/course-fees" className="btn-outline-glow">Course Fees</Link>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Why SIAT is <span className="gradient-text">Saharsa's Best</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "Prime Location", desc: "Saharsa ke center mein located — easy access sabke liye." },
            { icon: BookOpen, title: "Comprehensive Courses", desc: "Mobile, AC, Laptop, CCTV — sabhi popular technical courses available." },
            { icon: Award, title: "ISO Certified", desc: "Internationally recognized certificates with QR verification." },
            { icon: Users, title: "Expert Faculty", desc: "10+ years experienced trainers jo real industry se aaye hain." },
            { icon: Wrench, title: "Modern Labs", desc: "Latest equipment aur tools se hands-on practical training." },
            { icon: CheckCircle, title: "Placement Support", desc: "Dedicated cell jo graduates ko jobs dilane mein madad karta hai." },
          ].map((item) => (
            <div key={item.title} className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><item.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">SIAT Saharsa — Bihar's Premier Technical Institute</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>SIAT (Saharsa Institute of Advanced Technology) Saharsa, Bihar mein sthit ek ISO-certified technical training institute hai. Hum 2014 se students ko practical technical skills de rahe hain aur unhe industry-ready bana rahe hain.</p>
          <p>Hamare institute mein fully-equipped labs hain jahan students latest mobile phones, laptops, AC units aur CCTV systems par real practice karte hain. Yahan theory se zyada practical training par focus hai — kyunki hum maante hain ki asli skills hands-on kaam karne se aati hain.</p>
          <p>Saharsa aur aas-paas ke jile — Madhepura, Supaul, Purnia, Katihar, Bhagalpur — ke students hamare institute mein aake apna career build kar rahe hain. Affordable hostel facility bhi available hai bahar ke students ke liye.</p>
          <p>SIAT ka mission hai Bihar ke youth ko technical skills dekar self-reliant banana. Chahein aap job karna chahein ya apna business start karna chahein — SIAT aapko har tarah se tayyar karta hai.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/training-institute" className="btn-outline-glow !py-3 !px-5 !text-sm">All Courses</Link>
        <Link to="/training-institute/student-testimonials" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Reviews</Link>
        <Link to="/gallery" className="btn-outline-glow !py-3 !px-5 !text-sm">See Gallery</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default TechnicalTrainingPage;
