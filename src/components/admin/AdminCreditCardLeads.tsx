import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminCreditCardLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await (supabase as any)
        .from("credit_card_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setLeads(data);
    };
    load();

    const channel = supabase
      .channel("credit_card_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "credit_card_applications" }, (payload: any) => {
        setLeads((prev) => [payload.new as any, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Credit Card Student Leads</h2>
      <p className="text-sm text-muted-foreground">Students who filled the Bihar Student Credit Card form.</p>
      <p className="text-xs text-muted-foreground">Total: {leads.length} leads</p>

      <div className="space-y-3">
        {leads.map((l) => (
          <div key={l.id} className="glass-card p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-foreground">{l.student_name}</p>
                <p className="text-sm text-muted-foreground">{l.phone} {l.email && `· ${l.email}`}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${l.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                  {l.status || "pending"}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{new Date(l.created_at).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {l.course_applied && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{l.course_applied}</span>}
              {l.college_name && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{l.college_name}</span>}
              {l.district && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">📍 {l.district}</span>}
              {l.family_income && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">💰 {l.family_income}</span>}
              {l.date_of_birth && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">🎂 {l.date_of_birth}</span>}
              {l.class_12_year && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">📅 12th: {l.class_12_year}</span>}
            </div>
            {l.message && <p className="text-sm text-muted-foreground mt-2">{l.message}</p>}
          </div>
        ))}
        {leads.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No student leads yet.</p>}
      </div>
    </div>
  );
};

export default AdminCreditCardLeads;
