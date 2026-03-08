import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Quote } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const testimonials = [
  { name: "Rahul Kumar", course: "Mobile Repairing", location: "Saharsa", text: "SIAT se mobile repairing seekhne ke baad maine apni khud ki shop kholi hai. Ab mahine ka ₹25,000+ kama raha hoon. Best decision of my life!", rating: 5 },
  { name: "Priya Kumari", course: "Computer Basics + Tally", location: "Madhepura", text: "SIAT mein computer course karne ke baad mujhe ek private company mein accountant ki job mil gayi. Faculty bahut supportive hain.", rating: 5 },
  { name: "Amit Singh", course: "AC Repairing", location: "Supaul", text: "AC repairing ka advanced course kiya SIAT se. Ab Delhi mein ek badi company mein kaam kar raha hoon. Salary achhi hai aur kaam bhi interesting hai.", rating: 5 },
  { name: "Sanjay Yadav", course: "Laptop Repairing", location: "Purnia", text: "Laptop repairing course bahut practical tha. Real laptops par practice ki. Ab apna service center chala raha hoon Purnia mein.", rating: 5 },
  { name: "Neha Gupta", course: "CCTV Installation", location: "Saharsa", text: "CCTV installation ka course sirf 1 mahine ka tha lekin bahut comprehensive tha. Ab freelance CCTV fitting ka kaam karti hoon.", rating: 4 },
  { name: "Ravi Kumar", course: "Mobile Repairing (Advanced)", location: "Katihar", text: "Chip-level repair seekha SIAT se. Ab complex repairs bhi kar sakta hoon. Samsung service center mein kaam kar raha hoon.", rating: 5 },
  { name: "Anjali Devi", course: "AC Repairing", location: "Bhagalpur", text: "Ladki hoke bhi AC repairing seekhi. SIAT mein sabko equal opportunity milti hai. Ab government project mein kaam kar rahi hoon.", rating: 5 },
  { name: "Vikash Kumar", course: "Short Term Course", location: "Madhepura", text: "Short-term course karne ke baad turant job lagi. SIAT ka placement cell bahut active hai. Highly recommended!", rating: 5 },
];

const StudentTestimonialsPage = () => (
  <>
    <SEOHead title="Student Testimonials – SIAT Training Institute Bihar" description="Hear from SIAT graduates about their training experience, placement success, and career growth after completing technical courses in Bihar." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Student Success Stories</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          What Our Students <span className="gradient-text">Say About Us</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Hamare students ki success stories padhein — unke apne shabdon mein. 5000+ students ne SIAT se seekh kar apna career build kiya hai.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="glass-card p-6">
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.course} • {t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Aap Bhi Apni Success Story Likhein!</h2>
        <p className="text-muted-foreground mb-6">SIAT mein admission lein aur apna career build karein. Hazaron students ne kiya hai — ab aapki baari hai!</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Admission Inquiry</Link>
          <Link to="/training-institute" className="btn-outline-glow">View Courses</Link>
        </div>
      </div>
    </section>
  </>
);

export default StudentTestimonialsPage;
