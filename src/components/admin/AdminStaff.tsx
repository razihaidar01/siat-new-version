import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import { Plus, Edit, Trash2, ExternalLink, Eye, Download, Users, UserPlus } from "lucide-react";
import { toast } from "sonner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const SITE_URL = "https://www.siat.in";

const emptyForm = {
  full_name: "", employee_id: "", designation: "", department: "",
  phone: "", email: "", blood_group: "", date_of_birth: "",
  date_of_joining: "", father_name: "", mother_name: "",
  emergency_contact: "", address: "", aadhaar_number: "", pan_number: "",
  is_active: true,
};

const AdminStaff = () => {
  const [tab, setTab] = useState<"list" | "add">("list");
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [savedProfile, setSavedProfile] = useState<any>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const qrRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);

  const loadStaff = async () => {
    setLoading(true);
    const { data } = await supabase.from("staff_profiles").select("*").order("created_at", { ascending: false });
    if (data) setStaff(data);
    setLoading(false);
  };

  useEffect(() => { loadStaff(); }, []);

  const handleChange = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = async () => {
    if (!form.full_name || !form.employee_id || !form.designation || !form.department) {
      toast.error("Please fill all required fields"); return;
    }
    setSaving(true);
    let photo_url = null;

    if (photoFile) {
      const ext = photoFile.name.split(".").pop();
      const path = `${form.employee_id.toLowerCase()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("staff-photos").upload(path, photoFile, { upsert: true });
      if (!upErr) {
        const { data: urlData } = supabase.storage.from("staff-photos").getPublicUrl(path);
        photo_url = urlData.publicUrl;
      }
    }

    const payload: any = { ...form, ...(photo_url ? { photo_url } : {}) };
    delete payload.id;

    let error;
    if (editId) {
      ({ error } = await supabase.from("staff_profiles").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("staff_profiles").insert(payload));
    }

    setSaving(false);
    if (error) { toast.error("Error saving: " + error.message); return; }

    toast.success(editId ? "Staff updated!" : "Staff added!");
    setSavedProfile({ ...payload, employee_id: form.employee_id });
    setForm({ ...emptyForm });
    setPhotoFile(null);
    setEditId(null);
    loadStaff();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this staff profile?")) return;
    await supabase.from("staff_profiles").delete(id as any);
    toast.success("Deleted");
    loadStaff();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("staff_profiles").update({ is_active: !current } as any).eq("id", id);
    toast.success("Status updated");
    loadStaff();
  };

  const startEdit = (s: any) => {
    setForm({
      full_name: s.full_name || "", employee_id: s.employee_id || "",
      designation: s.designation || "", department: s.department || "",
      phone: s.phone || "", email: s.email || "", blood_group: s.blood_group || "",
      date_of_birth: s.date_of_birth || "", date_of_joining: s.date_of_joining || "",
      father_name: s.father_name || "", mother_name: s.mother_name || "",
      emergency_contact: s.emergency_contact || "", address: s.address || "",
      aadhaar_number: s.aadhaar_number || "", pan_number: s.pan_number || "",
      is_active: s.is_active ?? true,
    });
    setEditId(s.id);
    setTab("add");
  };

  const downloadCanvas = (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadSvg = (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const profileUrl = (eid: string) => `${SITE_URL}/staff/${eid.toLowerCase()}`;

  const InputField = ({ label, field, required, type = "text", placeholder = "" }: any) => (
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} value={(form as any)[field]} onChange={e => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm text-foreground" />
    </div>
  );

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => { setTab("list"); setSavedProfile(null); setEditId(null); setForm({ ...emptyForm }); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "list" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
          <Users className="w-4 h-4" /> Staff List
        </button>
        <button onClick={() => { setTab("add"); setSavedProfile(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "add" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
          <UserPlus className="w-4 h-4" /> {editId ? "Edit Staff" : "Add New Staff"}
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      {tab === "add" && (
        <div className="space-y-6">
          {savedProfile && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-green-800">✅ Staff Profile Saved!</h3>
              <p className="text-sm text-green-700">Profile URL: <a href={profileUrl(savedProfile.employee_id)} target="_blank" className="underline">{profileUrl(savedProfile.employee_id)}</a></p>
              <div className="flex flex-wrap gap-6">
                <div ref={qrRef} className="flex flex-col items-center gap-2">
                  <QRCodeCanvas value={profileUrl(savedProfile.employee_id)} size={160} />
                  <button onClick={() => downloadCanvas(qrRef, `qr-${savedProfile.employee_id}.png`)} className="text-xs flex items-center gap-1 text-primary hover:underline">
                    <Download className="w-3 h-3" /> Download QR
                  </button>
                </div>
                <div ref={barcodeRef} className="flex flex-col items-center gap-2">
                  <Barcode value={savedProfile.employee_id} width={1.5} height={60} fontSize={12} />
                  <button onClick={() => downloadSvg(barcodeRef, `barcode-${savedProfile.employee_id}.svg`)} className="text-xs flex items-center gap-1 text-primary hover:underline">
                    <Download className="w-3 h-3" /> Download Barcode
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <InputField label="Full Name" field="full_name" required />
            <InputField label="Employee ID" field="employee_id" required placeholder="e.g. SIAT-26SE001" />
            <InputField label="Designation" field="designation" required placeholder="e.g. Sales Executive" />
            <InputField label="Department" field="department" required placeholder="e.g. Sales Department" />
            <InputField label="Phone" field="phone" />
            <InputField label="Email" field="email" type="email" />
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Blood Group</label>
              <select value={form.blood_group} onChange={e => handleChange("blood_group", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground">
                <option value="">Select</option>
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <InputField label="Date of Birth" field="date_of_birth" placeholder="DD/MM/YYYY" />
            <InputField label="Date of Joining" field="date_of_joining" placeholder="DD/MM/YYYY" />
            <InputField label="Father's Name" field="father_name" />
            <InputField label="Mother's Name" field="mother_name" />
            <InputField label="Emergency Contact" field="emergency_contact" />
            <InputField label="Aadhaar Number" field="aadhaar_number" />
            <InputField label="PAN Number" field="pan_number" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Address</label>
            <textarea value={form.address} onChange={e => handleChange("address", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm text-foreground" rows={2} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Staff Photo</label>
            <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)}
              className="text-sm text-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_active} onChange={e => handleChange("is_active", e.target.checked)} id="active" />
            <label htmlFor="active" className="text-sm text-foreground">Active Employee</label>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : editId ? "Update Staff" : "Save Staff Profile"}
          </button>
        </div>
      )}

      {/* STAFF LIST */}
      {tab === "list" && (
        <div>
          {loading ? <p className="text-muted-foreground">Loading...</p> : staff.length === 0 ? <p className="text-muted-foreground">No staff profiles yet.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-3 font-medium text-muted-foreground">Photo</th>
                    <th className="p-3 font-medium text-muted-foreground">Name</th>
                    <th className="p-3 font-medium text-muted-foreground">Employee ID</th>
                    <th className="p-3 font-medium text-muted-foreground">Designation</th>
                    <th className="p-3 font-medium text-muted-foreground">Dept</th>
                    <th className="p-3 font-medium text-muted-foreground">Phone</th>
                    <th className="p-3 font-medium text-muted-foreground">Blood</th>
                    <th className="p-3 font-medium text-muted-foreground">Status</th>
                    <th className="p-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(s => (
                    <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-3">
                        {s.photo_url ? <img src={s.photo_url} className="w-10 h-10 rounded-full object-cover" alt="" /> : <div className="w-10 h-10 rounded-full bg-muted" />}
                      </td>
                      <td className="p-3 font-medium text-foreground">{s.full_name}</td>
                      <td className="p-3 text-muted-foreground">{s.employee_id}</td>
                      <td className="p-3 text-muted-foreground">{s.designation}</td>
                      <td className="p-3 text-muted-foreground">{s.department}</td>
                      <td className="p-3 text-muted-foreground">{s.phone || "—"}</td>
                      <td className="p-3"><span className="text-red-600 font-bold">{s.blood_group || "—"}</span></td>
                      <td className="p-3">
                        <button onClick={() => toggleActive(s.id, s.is_active)}
                          className={`text-xs px-2 py-1 rounded-full font-medium ${s.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {s.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button onClick={() => startEdit(s)} className="p-1.5 hover:bg-muted rounded" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                          <a href={`/staff/${s.employee_id.toLowerCase()}`} target="_blank" className="p-1.5 hover:bg-muted rounded" title="View"><ExternalLink className="w-3.5 h-3.5" /></a>
                          <button onClick={() => handleDelete(s.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
