import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminContacts = () => {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (data) setContacts(data);
    };
    load();

    const channel = supabase
      .channel("contact_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_submissions" }, (payload) => {
        setContacts((prev) => [payload.new as any, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Contact Submissions & AI Chat Leads</h2>
      <p className="text-sm text-muted-foreground">Real-time feed of contact form submissions and AI assistant leads.</p>

      <div className="space-y-3">
        {contacts.map((c) => (
          <div key={c.id} className="glass-card p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-foreground">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.phone} {c.email && `· ${c.email}`}</p>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</span>
            </div>
            {c.interest && <p className="text-xs text-primary bg-primary/10 inline-block px-2 py-0.5 rounded mb-2">{c.interest}</p>}
            {c.message && <p className="text-sm text-muted-foreground">{c.message}</p>}
          </div>
        ))}
        {contacts.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No submissions yet.</p>}
      </div>
    </div>
  );
};

export default AdminContacts;
