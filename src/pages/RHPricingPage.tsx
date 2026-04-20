import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹5,000",
    period: "starting from",
    desc: "Perfect for startups and small businesses",
    features: ["Landing Page / Website", "Mobile Responsive", "Basic SEO Setup", "Contact Form", "3 Revisions", "1 Month Support"],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹15,000",
    period: "starting from",
    desc: "For growing businesses needing advanced solutions",
    features: ["Full Web Application", "Custom Design", "Admin Dashboard", "API Integration", "Advanced SEO", "Database Setup", "Unlimited Revisions", "3 Months Support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "get a quote",
    desc: "For large-scale projects and enterprise needs",
    features: ["AI / ML Integration", "Custom Software", "Mobile App (iOS + Android)", "Cloud Infrastructure", "DevOps Setup", "Dedicated Team", "Priority Support", "SLA Guarantee"],
    popular: false,
  },
];

const RHPricingPage = () => {
  return (
    <section className="py-28 md:py-32 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 uppercase tracking-wider">
            Pricing
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Transparent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">Pricing.</span>
          </h1>
          <p className="text-base md:text-lg text-white/50 mt-5 max-w-xl mx-auto">
            Simple, honest pricing for every stage of your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
                plan.popular
                  ? "border-indigo-400/50 bg-gradient-to-b from-indigo-500/[0.08] to-purple-500/[0.04] shadow-[0_30px_80px_-20px_rgba(99,102,241,0.45)]"
                  : "border-white/[0.08] bg-white/[0.04] hover:border-indigo-400/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_8px_25px_rgba(99,102,241,0.5)]">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{plan.price}</span>
                <span className="text-sm text-white/40 ml-2">{plan.period}</span>
              </div>
              <p className="text-sm text-white/50 mb-8">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-indigo-300" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/rhsoftware/contact"
                className={`block text-center py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-[0_0_35px_rgba(99,102,241,0.5)]"
                    : "border border-white/15 hover:bg-white/[0.04] hover:border-white/25"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RHPricingPage;
