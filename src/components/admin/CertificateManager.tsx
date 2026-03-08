import { useState } from "react";
import { Award, Search } from "lucide-react";
import CertificateCreate from "./CertificateCreate";
import CertificateSearch from "./CertificateSearch";

const CertificateManager = () => {
  const [subTab, setSubTab] = useState<"create" | "search">("create");

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setSubTab("create")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            subTab === "create" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Award className="w-4 h-4" /> Create Certificate
        </button>
        <button
          onClick={() => setSubTab("search")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            subTab === "search" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Search className="w-4 h-4" /> Search & Manage
        </button>
      </div>

      {subTab === "create" && <CertificateCreate />}
      {subTab === "search" && <CertificateSearch />}
    </div>
  );
};

export default CertificateManager;
