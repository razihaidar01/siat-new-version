import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const RHContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      interest: "RH Software Inquiry",
      message: form.message.trim(),
    };

    const { error } = await supabase.from("contact_submissions").insert(payload);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      // Send email notification (fire-and-forget)
      supabase.functions.invoke("send-contact-email", { body: payload }).catch(() => {});

      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <section className="py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Connect</span>
          </h1>
          <p className="text-lg text-white/40 mt-4">Share your project idea and let's build something amazing together.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {[
              { key: "name", label: "Name", type: "text", required: true },
              { key: "email", label: "Email", type: "email", required: false },
              { key: "phone", label: "Phone", type: "tel", required: true },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-sm font-medium text-white/60 block mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={(form as any)[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  required={field.required}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none text-white placeholder:text-white/20 transition-all"
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-white/60 block mb-2">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none text-white placeholder:text-white/20 transition-all resize-none"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Get in Touch</h3>
              <div className="space-y-4">
                <a href="tel:+917004216219" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-purple-400" /> +91 7004216219
                </a>
                <a href="tel:+919342470019" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-purple-400" /> +91 9342470019
                </a>
                <a href="mailto:siat.sws@gmail.com" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-purple-400" /> siat.sws@gmail.com
                </a>
                <div className="flex items-center gap-3 text-white/50">
                  <MapPin className="w-5 h-5 text-purple-400" /> Saharsa, Bihar, India
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Response Time</h3>
              <p className="text-white/40 text-sm">We typically respond within 2-4 hours during business hours. For urgent projects, call us directly.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RHContactPage;
