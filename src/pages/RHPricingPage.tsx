import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹25,000",
    period: "starting from",
    desc: "Perfect for startups and small businesses",
    features: ["Landing Page / Website", "Mobile Responsive", "Basic SEO Setup", "Contact Form", "3 Revisions", "1 Month Support"],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹75,000",
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
    <section className="py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-6">Pricing</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Pricing</span>
          </h1>
          <p className="text-lg text-white/40 mt-4 max-w-xl mx-auto">Simple, honest pricing for every stage of your business.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl border transition-all ${plan.popular ? "border-purple-500/40 bg-purple-500/[0.05] shadow-[0_0_40px_rgba(139,92,246,0.1)]" : "border-white/10 bg-white/[0.02]"}`}
            >
              {plan.popular && <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4 block">Most Popular</span>}
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-sm text-white/40 ml-2">{plan.period}</span>
              </div>
              <p className="text-sm text-white/40 mb-8">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/rhsoftware/contact"
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                    : "border border-white/20 hover:bg-white/5"
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
