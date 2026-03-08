import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IndianRupee, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const fees = [
  { course: "Mobile Repairing (Basic)", duration: "3 Months", fee: "₹8,000", href: "/training-institute/mobile-repairing-course-bihar" },
  { course: "Mobile Repairing (Advanced)", duration: "6 Months", fee: "₹15,000", href: "/training-institute/mobile-repairing-course-bihar" },
  { course: "AC Repairing", duration: "3 Months", fee: "₹10,000", href: "/training-institute/ac-repairing-course-bihar" },
  { course: "AC Repairing (Advanced)", duration: "6 Months", fee: "₹18,000", href: "/training-institute/ac-repairing-course-bihar" },
  { course: "Laptop Repairing", duration: "3 Months", fee: "₹10,000", href: "/training-institute/laptop-repairing-course-bihar" },
  { course: "Laptop Repairing (Advanced)", duration: "6 Months", fee: "₹18,000", href: "/training-institute/laptop-repairing-course-bihar" },
  { course: "CCTV Installation", duration: "1 Month", fee: "₹5,000", href: "/training-institute/cctv-installation-training-bihar" },
  { course: "CCTV Installation (Advanced)", duration: "3 Months", fee: "₹10,000", href: "/training-institute/cctv-installation-training-bihar" },
  { course: "Computer Basics + Tally", duration: "2 Months", fee: "₹5,000", href: "/training-institute/short-term-job-courses-bihar" },
  { course: "Solar Panel Installation", duration: "1 Month", fee: "₹6,000", href: "/training-institute/short-term-job-courses-bihar" },
];

const inclusions = [
  "Practical hands-on training",
  "ISO-verified certificate with QR code",
  "Study materials & notes",
  "Placement support",
  "Lifetime doubt clearing support",
  "Flexible batch timings",
];

const CourseFeesPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Course <span className="gradient-text">Fees Structure</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT ke sabhi courses ki fees jaanein — affordable aur value-for-money training with EMI options available.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-display font-bold text-foreground">Course</th>
                  <th className="text-left p-4 font-display font-bold text-foreground">Duration</th>
                  <th className="text-left p-4 font-display font-bold text-foreground">Fee</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.course + f.duration} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                    <td className="p-4 text-sm text-foreground font-medium">{f.course}</td>
                    <td className="p-4 text-sm text-muted-foreground">{f.duration}</td>
                    <td className="p-4 text-sm font-bold text-primary">{f.fee}</td>
                    <td className="p-4"><Link to={f.href} className="text-xs text-primary hover:underline">Details →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">* Fees subject to change. EMI options available. Contact for latest pricing.</p>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">What's <span className="gradient-text">Included</span></h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {inclusions.map((item) => (
            <div key={item} className="flex items-center gap-3 glass-card p-4">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Ready to Enroll?</h2>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Admission open hai! Contact karein aur apna course choose karein. EMI facility bhi available hai.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/contact-us" className="btn-primary-glow">Enroll Now</Link>
        <Link to="/training-institute" className="btn-outline-glow">All Courses</Link>
      </div>
    </section>
  </>
);

export default CourseFeesPage;
