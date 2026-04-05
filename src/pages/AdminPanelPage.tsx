import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { LogOut, Award, Image, FileText, MessageSquare, Search, CreditCard } from "lucide-react";
import siatLogo from "@/assets/siat-logo.png";
import AdminCertificates from "@/components/admin/AdminCertificates";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminDocuments from "@/components/admin/AdminDocuments";
import AdminContacts from "@/components/admin/AdminContacts";
import AdminCertSearch from "@/components/admin/AdminCertSearch";
import AdminCreditCardLeads from "@/components/admin/AdminCreditCardLeads";

const tabs = [
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "search", label: "Search & Manage", icon: Search },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "contacts", label: "Contact Leads", icon: MessageSquare },
];

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState("certificates");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin-login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin-login");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-primary font-display text-2xl">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={siatLogo} alt="SIAT" className="w-10 h-10 rounded-full" />
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">SIAT Admin Panel</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card/50 px-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {activeTab === "certificates" && <AdminCertificates />}
          {activeTab === "search" && <AdminCertSearch />}
          {activeTab === "gallery" && <AdminGallery />}
          {activeTab === "documents" && <AdminDocuments />}
          {activeTab === "contacts" && <AdminContacts />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
