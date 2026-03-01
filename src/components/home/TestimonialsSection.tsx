import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Rahul Kumar", course: "Mobile Repairing", text: "SIAT's practical training helped me start my own mobile repair shop within 2 months of completing the course. The placement team was very supportive.", rating: 5 },
  { name: "Priya Singh", course: "Website Development", text: "RH Software's mentorship helped me build real projects. I got placed in a Patna-based IT company right after the program.", rating: 5 },
  { name: "Amit Jha", course: "AC Repairing", text: "Best AC repairing institute in Bihar. Hands-on training with real units. Now I earn ₹25,000+ monthly as a certified technician.", rating: 5 },
  { name: "Sneha Kumari", course: "MBBS Admission", text: "SIAT's consultancy team guided me through the entire NEET counseling and admission process. Very professional and trustworthy.", rating: 5 },
  { name: "Vikash Yadav", course: "CCTV Installation", text: "Completed CCTV training in 3 months. Now handling installation projects independently. Great course and great team!", rating: 5 },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-8 min-w-[320px] md:min-w-[380px] snap-center flex-shrink-0"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div>
                <p className="font-display font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.course}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
