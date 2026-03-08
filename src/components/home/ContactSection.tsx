import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || null,
      interest: formData.get("interest") as string,
      message: (formData.get("message") as string) || null,
    };

    const { error } = await supabase.from("contact_submissions").insert(payload);
    supabase.functions.invoke("send-contact-email", { body: payload }).catch(() => {});

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
      form.reset();
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl outline-none transition-all text-white placeholder:text-white/30"
    + " bg-white/[0.04] border border-white/[0.08] focus:border-[hsl(var(--neon-cyan))] focus:ring-2 focus:ring-[hsl(var(--neon-cyan))]/20";

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "hsl(215 50% 6%)" }}>
      {/* Glow orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ background: "hsl(var(--neon-cyan))", top: "10%", left: "-10%" }}
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-heading mt-3">
            Contact <span className="gradient-text">SIAT</span>
          </h2>
          <p className="mt-4" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
            Koi bhi sawaal ho — humse baat karein, hum madad ke liye taiyaar hain!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Name</label>
                <input name="name" type="text" required className={inputClass} placeholder="Apna naam likhein" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Phone</label>
                <input name="phone" type="tel" required className={inputClass} placeholder="+91" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Email</label>
              <input name="email" type="email" className={inputClass} placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Interested In</label>
              <select name="interest" className={inputClass}>
                <option>Training Courses</option>
                <option>Software Development</option>
                <option>Consultancy Services</option>
                <option>Government Projects</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Message</label>
              <textarea name="message" rows={4} className={`${inputClass} resize-none`} placeholder="Apni zaroorat batayein..." />
            </div>
            <button type="submit" disabled={loading} className="btn-primary-glow w-full flex items-center justify-center gap-2 disabled:opacity-70">
              {submitted ? <><CheckCircle className="w-4 h-4" /> Bhej Diya! ✓</> : loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 space-y-6">
              {[
                { icon: MapPin, title: "Address", text: "SIAT, Main Road, Saharsa, Bihar – 852201" },
                { icon: Phone, title: "Phone", text: "+91 7004216219, +91 9342470019" },
                { icon: Mail, title: "Email", text: "siat.sws@gmail.com" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: "hsl(0 0% 100% / 0.06)" }}>
                    <item.icon className="w-5 h-5" style={{ color: "hsl(var(--neon-cyan))" }} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold" style={{ color: "white" }}>{item.title}</h4>
                    <p className="text-sm mt-1" style={{ color: "hsl(0 0% 100% / 0.5)" }}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card overflow-hidden h-[280px] group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57364.45!2d86.56!3d25.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef7082fe!2sSaharsa!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                title="SIAT Group Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
