import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import siatLogo from "@/assets/siat-logo.png";
import { Phone, Mail, MapPin, Calendar, User, Heart, Shield, Droplets } from "lucide-react";

const StaffProfilePage = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [staff, setStaff] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!employeeId) { setNotFound(true); setLoading(false); return; }
      const { data, error } = await supabase
        .from("staff_profiles")
        .select("*")
        .ilike("employee_id", employeeId)
        .maybeSingle();
      if (error || !data) { setNotFound(true); } else { setStaff(data); }
      setLoading(false);
    };
    load();
  }, [employeeId]);

  const maskAadhaar = (val: string | null) => {
    if (!val) return null;
    const digits = val.replace(/\s/g, "");
    if (digits.length < 4) return val;
    return "XXXX XXXX " + digits.slice(-4);
  };

  const maskPan = (val: string | null) => {
    if (!val) return null;
    if (val.length < 4) return val;
    return "XXXXXX" + val.slice(-4);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="animate-pulse text-blue-600 font-bold text-xl">Loading Profile...</div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white gap-4">
      <img src={siatLogo} alt="SIAT" className="w-16 h-16 rounded-full" />
      <h1 className="text-2xl font-bold text-gray-800">Employee Not Found</h1>
      <p className="text-gray-500">No staff profile matches this ID.</p>
    </div>
  );

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | null | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-3 py-3 border-b border-blue-50 last:border-0">
        <Icon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
          <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-5 flex items-center gap-3">
          <img src={siatLogo} alt="SIAT" className="w-12 h-12 rounded-full border-2 border-white/30" />
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">SIAT</h2>
            <p className="text-blue-200 text-xs">Employee Identity Card</p>
          </div>
        </div>

        {/* Photo + Name */}
        <div className="flex flex-col items-center -mt-0 pt-6 pb-4 px-6">
          {staff.photo_url ? (
            <img src={staff.photo_url} alt={staff.full_name} className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-lg" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-50">
              <User className="w-12 h-12 text-blue-300" />
            </div>
          )}
          <h1 className="text-xl font-bold text-gray-900 mt-4">{staff.full_name}</h1>
          <p className="text-blue-600 font-medium text-sm">{staff.designation}</p>
          <p className="text-gray-500 text-xs">{staff.department}</p>
          <span className="mt-2 inline-block bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wider">
            {staff.employee_id}
          </span>
        </div>

        {/* Blood Group Badge */}
        {staff.blood_group && (
          <div className="flex justify-center pb-4">
            <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 text-sm font-bold px-4 py-2 rounded-full">
              <Droplets className="w-4 h-4" />
              Blood Group: {staff.blood_group}
            </span>
          </div>
        )}

        {/* Details */}
        <div className="px-6 pb-6">
          <div className="bg-blue-50/50 rounded-xl p-4">
            <InfoRow icon={Phone} label="Phone" value={staff.phone} />
            <InfoRow icon={Mail} label="Email" value={staff.email} />
            <InfoRow icon={Calendar} label="Date of Birth" value={staff.date_of_birth} />
            <InfoRow icon={Calendar} label="Date of Joining" value={staff.date_of_joining} />
            <InfoRow icon={User} label="Father's Name" value={staff.father_name} />
            <InfoRow icon={User} label="Mother's Name" value={staff.mother_name} />
            <InfoRow icon={Phone} label="Emergency Contact" value={staff.emergency_contact} />
            <InfoRow icon={MapPin} label="Address" value={staff.address} />
            <InfoRow icon={Shield} label="Aadhaar Number" value={maskAadhaar(staff.aadhaar_number)} />
            <InfoRow icon={Shield} label="PAN Number" value={maskPan(staff.pan_number)} />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-50 px-6 py-3 text-center">
          <p className="text-xs text-gray-400">B/O Station Road, Gamhariya, Bajnathpur Chowk, Saharsa, Bihar</p>
          <p className="text-xs text-gray-400">+91 99421 15058 | siat.sws@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default StaffProfilePage;
