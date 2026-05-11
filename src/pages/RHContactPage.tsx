import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send, MapPin, Phone, Mail, CheckCircle2, Clock, Shield, FileText,
  MessageSquare, Calendar,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RH_IMAGES } from "@/lib/rhPlaceholders";
import { useSEO } from "@/hooks/useSEO";
import {
  RH_BASE_URL, rhOrganizationSchema, rhLocalBusinessSchema, rhBreadcrumb,
} from "@/lib/rhSeo";

const spamPattern = /(\b(fuck|shit|bitch|sex|porn|hack|free money|asshole)\b)/i;

const FadeUp = ({ children, delay = 0, className = "" }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const projectTypes = [
  "Web application",
  "Mobile app",
  "AI / ML product",
  "SaaS platform",
  "Internal tool",
  "Other",
];

const budgets = [
  "Under ₹50K",
  "₹50K – ₹2L",
  "₹2L – ₹10L",
  "₹10L+",
  "Not sure yet",
];

const RHContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    projectType: "", budget: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useSEO({
    title: "Contact RH Software | Hire Best Software Developer in Bihar",
    description:
      "Talk to RH Software (by SIAT). Free strategy call, 24-hour response. Hire Bihar's top website, app and AI developers. Serving Patna, Saharsa, Madhepura, Purnia, Supaul, Darbhanga and all Bihar.",
    keywords: "contact RH Software, hire web developer bihar, software company contact patna, app developer contact saharsa",
    canonical: `${RH_BASE_URL}/rhsoftware/contact`,
    schema: [
      rhOrganizationSchema,
      rhLocalBusinessSchema,
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
        { name: "Contact", url: `${RH_BASE_URL}/rhsoftware/contact` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: `${RH_BASE_URL}/rhsoftware/contact`,
        name: "Contact RH Software",
      },
    ],
  });

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
          interest: `RH Software · ${form.projectType || "General"} · ${form.budget || "—"}`,
          message: `${form.company ? `Company: ${form.company}\n` : ""}${message}`,
        },
      });
      if (error) throw error;
      setSuccess(true);
      toast({ title: "Message sent!", description: "We'll respond within a few hours." });
      setForm({ name: "", email: "", phone: "", company: "", projectType: "", budget: "", message: "" });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-10 md:pt-16 pb-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span className="rh-eyebrow">
              <span className="dot" />
              Available for projects · Q3 2026
            </span>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1 className="mt-5 text-[40px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em] max-w-4xl">
              Let's build something{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#22D3EE]">
                people actually use.
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-6 text-[16px] md:text-[17px] rh-text-muted max-w-2xl leading-relaxed">
              Tell us about your project. You'll hear back from a senior engineer within a few hours
              with concrete next steps — not a sales pitch.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 items-start">
          {/* FORM */}
          <FadeUp className="lg:col-span-7">
            <div className="rh-surface p-7 md:p-9">
              {success ? (
                <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-[26px] font-semibold tracking-tight">Message received.</h3>
                  <p className="rh-text-muted mt-3 max-w-sm">
                    A senior engineer will reach out within a few hours with next steps.
                    Check your inbox (and spam, just in case).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] rh-text-dim flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Project brief
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Your name *" placeholder="Jane Doe"
                           value={form.name}
                           onChange={(v) => setForm({ ...form, name: v })} required />
                    <Field label="Company (optional)" placeholder="Acme Inc."
                           value={form.company}
                           onChange={(v) => setForm({ ...form, company: v })} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Mobile *" placeholder="9876543210" type="tel"
                           value={form.phone}
                           onChange={(v) => setForm({ ...form, phone: v })} required />
                    <Field label="Email" placeholder="you@email.com" type="email"
                           value={form.email}
                           onChange={(v) => setForm({ ...form, email: v })} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <SelectField label="Project type" value={form.projectType}
                                 options={projectTypes}
                                 onChange={(v) => setForm({ ...form, projectType: v })} />
                    <SelectField label="Budget range" value={form.budget}
                                 options={budgets}
                                 onChange={(v) => setForm({ ...form, budget: v })} />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-white/65 uppercase tracking-[0.16em] block mb-2">
                      Tell us about your project *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="What problem are you solving? Who's it for? Any deadlines?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#7C3AED]/60 focus:ring-2 focus:ring-[#7C3AED]/20 outline-none text-white placeholder:text-white/25 transition-all resize-none text-[14px]"
                    />
                  </div>

                  {errorMsg && <p className="text-[13px] text-rose-400">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white hover:shadow-[0_18px_40px_-14px_rgba(124,58,237,0.85)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send project brief"}
                  </button>

                  <p className="text-[11.5px] rh-text-dim text-center pt-1">
                    By submitting you agree to be contacted about your inquiry. We never share details with third parties.
                  </p>
                </form>
              )}
            </div>
          </FadeUp>

          {/* SIDE INFO */}
          <FadeUp delay={0.1} className="lg:col-span-5 space-y-5">
            {/* Workspace visual */}
            <div className="rh-surface overflow-hidden">
              <div className="relative aspect-[16/10]">
                <img src={RH_IMAGES.consultation} alt="RH Software workspace" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/70">What to expect</div>
                  <div className="text-[18px] font-semibold tracking-tight text-white mt-1">A real conversation, not a sales call.</div>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="rh-surface p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] rh-text-dim mb-4 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> What happens next
              </div>
              <ol className="space-y-4">
                {[
                  { t: "Reply within hours", d: "A senior engineer reads every brief — no chatbot." },
                  { t: "30-min discovery call", d: "We map the problem, scope and rough timeline." },
                  { t: "Written proposal", d: "Fixed price, milestones, and team — within 48 hours." },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center text-[12px] font-mono text-[#C4B5FD] shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-[14px] font-semibold text-white">{s.t}</div>
                      <div className="text-[12.5px] rh-text-muted mt-0.5">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact channels */}
            <div className="rh-surface p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] rh-text-dim mb-4">Direct channels</div>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: "+91 70042 16219", href: "tel:+917004216219" },
                  { icon: Phone, label: "+91 99421 15058", href: "tel:+919942115058" },
                  { icon: Mail, label: "siat.sws@gmail.com", href: "mailto:siat.sws@gmail.com" },
                ].map((it) => (
                  <a key={it.label} href={it.href} className="flex items-center gap-3 text-[14px] text-white/75 hover:text-white transition-colors group">
                    <span className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#7C3AED]/40 group-hover:bg-[#7C3AED]/10 transition-all">
                      <it.icon className="w-4 h-4 text-[#A78BFA]" />
                    </span>
                    {it.label}
                  </a>
                ))}
                <div className="flex items-center gap-3 text-[14px] text-white/75">
                  <span className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#A78BFA]" />
                  </span>
                  Saharsa, Bihar · India
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, l: "Avg reply", v: "<4 hrs" },
                { icon: Shield, l: "NDA", v: "On request" },
                { icon: FileText, l: "Proposal", v: "<48 hrs" },
              ].map((t) => (
                <div key={t.l} className="rh-surface p-4 text-center">
                  <t.icon className="w-4 h-4 text-[#A78BFA] mx-auto mb-2" />
                  <div className="text-[14px] font-semibold tracking-tight">{t.v}</div>
                  <div className="text-[10.5px] rh-text-dim mt-1 uppercase tracking-[0.16em]">{t.l}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
};

const Field = ({
  label, value, onChange, type = "text", placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) => (
  <div>
    <label className="text-[11px] font-semibold text-white/65 uppercase tracking-[0.16em] block mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#7C3AED]/60 focus:ring-2 focus:ring-[#7C3AED]/20 outline-none text-white placeholder:text-white/25 transition-all text-[14px]"
    />
  </div>
);

const SelectField = ({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) => (
  <div>
    <label className="text-[11px] font-semibold text-white/65 uppercase tracking-[0.16em] block mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#7C3AED]/60 focus:ring-2 focus:ring-[#7C3AED]/20 outline-none text-white transition-all text-[14px] appearance-none cursor-pointer"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B4B4C7' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
      }}
    >
      <option value="" className="bg-[#0D0D12]">Select...</option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0D0D12]">{o}</option>
      ))}
    </select>
  </div>
);

export default RHContactPage;
