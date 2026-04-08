import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import siatLogo from "@/assets/siat-logo.png";
import { Search, Shield, Users, GraduationCap, Briefcase, Building2, Award, Phone, Mail, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const highlights = [
  { icon: GraduationCap, label: "Training Institute", desc: "Mobile, Laptop, AC Repairing & CCTV courses" },
  { icon: Building2, label: "RH Software", desc: "Web, App & AI development company" },
  { icon: Briefcase, label: "Consultancy", desc: "ISO, MSME & college admission services" },
  { icon: Award, label: "Government Projects", desc: "PMKVY, Skill India & CSR education" },
];

const StaffLandingPage = () => {
  const [empId, setEmpId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = empId.trim();
    if (!trimmed) { setError("Please enter an Employee ID"); return; }
    setError("");
    navigate(`/staff/${trimmed.toLowerCase()}`);
  };

  return (
    <>
      <SEOHead title="Staff Portal – SIAT" description="Verify SIAT employee identity. Enter employee ID to view staff profile and details." />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
            <img src={siatLogo} alt="SIAT" className="w-14 h-14 rounded-full border-2 border-white/30" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">SIAT Group</h1>
              <p className="text-blue-200 text-sm">Bihar's Leading Training, IT & Consultancy Organization</p>
            </div>
          </div>
        </header>

        {/* Hero with Search */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-[0.03]" />
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Employee Verification Portal
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Verify Staff <span className="text-blue-600">Identity</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                Enter the employee ID printed on the staff ID card to view verified profile details.
              </p>

              <form onSubmit={handleSearch} className="max-w-lg mx-auto">
                <div className="flex shadow-xl rounded-2xl overflow-hidden border border-blue-100">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={empId}
                      onChange={(e) => { setEmpId(e.target.value); setError(""); }}
                      placeholder="e.g. SIAT-26SE001"
                      className="w-full pl-12 pr-4 py-4 text-base md:text-lg bg-white focus:outline-none text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                  <button type="submit" className="px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors text-base">
                    Search
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
            </motion.div>
          </div>
        </section>

        {/* About SIAT */}
        <section className="bg-white border-t border-blue-50">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">About SIAT Group</h3>
                <p className="text-gray-500 max-w-3xl mx-auto">
                  SIAT (Society for Innovative & Advanced Training) is a multi-division organization based in Saharsa, Bihar, 
                  working across education, technology, government projects, and consultancy services since its establishment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "5000+", label: "Students Trained" },
                { num: "17+", label: "Partner Colleges" },
                { num: "50+", label: "Courses Offered" },
                { num: "10+", label: "Years Experience" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-bold">{s.num}</p>
                  <p className="text-blue-200 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">Our Divisions</h3>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              SIAT operates across multiple verticals to empower Bihar through skill, technology, and consultancy.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Training Institute",
                  items: ["Mobile Repairing Course", "AC Repairing Course", "Laptop Repairing Course", "CCTV Installation Training", "Placement Support"],
                },
                {
                  title: "RH Software (IT Division)",
                  items: ["Website Development", "App Development", "AI & ML Solutions", "ERP / CRM Systems", "Digital Marketing"],
                },
                {
                  title: "Consultancy & Projects",
                  items: ["College Admission Guidance", "ISO Certification", "MSME Registration", "Government Tenders", "Bihar Student Credit Card"],
                },
              ].map((div) => (
                <div key={div.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">{div.title}</h4>
                  <ul className="space-y-2">
                    {div.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <img src={siatLogo} alt="SIAT" className="w-10 h-10 rounded-full" />
                <span className="font-bold text-lg">SIAT Group</span>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 99421 15058</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> siat.sws@gmail.com</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Saharsa, Bihar</span>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-6">© {new Date().getFullYear()} SIAT Group. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default StaffLandingPage;
