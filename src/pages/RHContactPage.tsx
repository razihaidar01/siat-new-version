import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const spamPattern = /(\b(fuck|shit|bitch|sex|porn|hack|free money|asshole)\b)/i;

const RHContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const name = form.name.trim();
    const phone = form.phone.replace(/[\s\-()]/g, "");
    const message = form.message.trim();

    if (!/^[A-Za-z\s.\-]{2,100}$/.test(name)) {
      setErrorMsg("Please enter a valid name (letters only).");
      return;
    }
    if (!/^(\+91)?[6-9]\d{9}$/.test(phone)) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (spamPattern.test(message) || spamPattern.test(name)) {
      setErrorMsg("Please use appropriate language.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name,
          phone,
          email: form.email.trim() || null,
          interest: "RH Software Inquiry",
          message,
        },
      });
      if (error) throw error;
      setSuccess(true);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <section className="py-28 md:py-32 px-6 md:px-10 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 text-emerald-300 text-xs font-medium mb-6 uppercase tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            Available for Projects
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Let's build something{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">together.</span>
          </h1>
          <p className="text-base md:text-lg text-white/50 mt-5">
            Share your project idea — we typically reply within a few hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-7 md:p-8"
          >
            {success ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Message Sent!</h3>
                <p className="text-white/55">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { key: "name", label: "Your Name", type: "text", required: true, placeholder: "Jane Doe" },
                  { key: "email", label: "Email (optional)", type: "email", required: false, placeholder: "you@email.com" },
                  { key: "phone", label: "Mobile Number", type: "tel", required: true, placeholder: "9876543210" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-semibold text-white/65 uppercase tracking-wider block mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20 outline-none text-white placeholder:text-white/25 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-white/65 uppercase tracking-wider block mb-2">Tell us about your project</label>
                  <textarea
                    rows={4}
                    placeholder="What are you building?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20 outline-none text-white placeholder:text-white/25 transition-all resize-none"
                  />
                </div>
                {errorMsg && <p className="text-sm text-rose-400">{errorMsg}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-[0_0_35px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-7">
              <h3 className="font-bold text-lg mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>Get in Touch</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "+91 70042 16219", href: "tel:+917004216219" },
                  { icon: Phone, label: "+91 99421 15058", href: "tel:+919942115058" },
                  { icon: Mail, label: "siat.sws@gmail.com", href: "mailto:siat.sws@gmail.com" },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                    <span className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center group-hover:border-indigo-400/40 group-hover:bg-indigo-500/15 transition-all">
                      <item.icon className="w-4 h-4 text-indigo-300" />
                    </span>
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center gap-3 text-white/60">
                  <span className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-indigo-300" />
                  </span>
                  Saharsa, Bihar, India
                </div>
              </div>
              <div className="flex gap-2.5 mt-6 pt-6 border-t border-white/[0.06]">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-indigo-400/40 transition-all"><Github className="w-4 h-4" /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-indigo-400/40 transition-all"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/[0.06] to-purple-500/[0.04] backdrop-blur-xl p-7">
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Response Time</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                We typically respond within 2-4 hours during business hours. For urgent projects, call us directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RHContactPage;
