"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { getUserDataById, updateUserData } from "@/firebaseFunctions";
import { ArrowLeft, Edit, Save, X, Globe, Link as LinkIcon, User, Phone, Mail, MapPin, Droplet, Weight, Calendar, Heart, AlertTriangle, Pill, Cigarette, Beer, Shield } from "lucide-react";
import HeartLoading from "@/components/custom/HeartLoading";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function ProfilePage() {
  const { userId, role } = useUser();
  const router = useRouter();

  const [donorData, setDonorData] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!userId || role !== "donor") {
      router.push("/");
      return;
    }

    async function fetchProfile() {
      setIsLoading(true);
      try {
        const donor = await getUserDataById(userId, "donor");
        setDonorData(donor);
        setEditedData(donor || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [userId, role, router]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await updateUserData("donors", userId, editedData);

      if (response.success) {
        setDonorData(editedData);
        setEditMode(false);
        // In a real app, use a toast notification here
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + response.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedData(donorData);
    setEditMode(false);
  };

  const copyProfileLink = () => {
    const link = `${window.location.origin}/donor/${userId}`;
    navigator.clipboard.writeText(link);
    alert("Profile link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <HeartLoading />
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return "D";
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  // Helper to determine if field has changed
  const hasChanged = (key: string) => {
    return donorData && editedData[key] !== donorData[key];
  };

  return (
    <ContentLayout title="My Profile">
      <div className="min-h-screen bg-gray-50 flex flex-col pb-10">
        {/* Hero / Header Actions */}
        <div className="max-w-7xl mx-auto w-full mb-6">
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => alert("Make public feature coming soon!")}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              Make Public
            </button>
            <button
              onClick={copyProfileLink}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <LinkIcon className="w-4 h-4 text-gray-500" />
              Copy Link
            </button>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95 ml-auto sm:ml-0"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 ml-auto sm:ml-0">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:active:scale-100"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Core Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details Card */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 relative overflow-hidden">
              {editMode && <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 animate-pulse"></div>}
              <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" /> Personal Details
              </h2>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8 pb-8 border-b border-gray-100">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-gray-500 cursor-default">
                    {getInitials(editedData.d_name)}
                  </div>
                  {editMode && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-xs font-semibold">Change Photo</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full space-y-4">
                  <ProfileField
                    icon={User}
                    label="Dog's Name"
                    value={editedData.d_name}
                    editable={editMode}
                    onChange={(val) => setEditedData({ ...editedData, d_name: val })}
                    placeholder="Enter dog's name"
                    changed={hasChanged('d_name')}
                  />
                  <ProfileField
                    icon={Mail}
                    label="Email Address"
                    value={editedData.email}
                    editable={editMode}
                    onChange={(val) => setEditedData({ ...editedData, email: val })}
                    placeholder="name@example.com"
                    changed={hasChanged('email')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <ProfileField
                  icon={Droplet}
                  label="Blood Group"
                  value={editedData.d_bloodgroup}
                  editable={editMode}
                  onChange={(val) => setEditedData({ ...editedData, d_bloodgroup: val })}
                  type="select"
                  options={["DEA 1.1+", "DEA 1.2+", "DEA 3", "DEA 4", "DEA 5", "DEA 7", "Universal"]}
                  highlight="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded inline-block"
                  changed={hasChanged('d_bloodgroup')}
                />
                <ProfileField
                  icon={Phone}
                  label="Phone Number"
                  value={editedData.phone || donorData?.phone}
                  editable={false}
                  locked
                  helperText="Contact support to update phone number"
                />
                <div className="md:col-span-2">
                  <ProfileField
                    icon={MapPin}
                    label="Location"
                    value={`${editedData.d_city || ''}, ${editedData.d_region?.[1] || editedData.d_region?.[0] || ''}`}
                    editable={false}
                    locked
                    helperText="Location is managed securely"
                  />
                </div>
              </div>
            </section>

            {/* Health Details Card */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" /> Medical Profile
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                <ProfileField
                  icon={Calendar}
                  label="Date of Birth"
                  value={editedData.d_dob}
                  editable={editMode}
                  onChange={(val) => setEditedData({ ...editedData, d_dob: val })}
                  type="date"
                  changed={hasChanged('d_dob')}
                />
                <ProfileField
                  icon={Weight}
                  label="Weight (kg)"
                  value={editedData.d_weight_kg}
                  editable={editMode}
                  onChange={(val) => setEditedData({ ...editedData, d_weight_kg: val })}
                  type="number"
                  suffix="kg"
                  changed={hasChanged('d_weight_kg')}
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Lifestyle & Eligibility Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SwitchField
                    icon={Shield}
                    label="Donation Cooldown"
                    subLabel="Has donated in last 3 months?"
                    value={editedData.d_isRecentDonation === "yes"}
                    editable={editMode}
                    onChange={(checked) => setEditedData({ ...editedData, d_isRecentDonation: checked ? "yes" : "no" })}
                    positiveText="Yes, Recent"
                    negativeText="No, Eligible"
                    changed={hasChanged('d_isRecentDonation')}
                  />
                  <SwitchField
                    icon={Cigarette}
                    label="Smoker Environment"
                    subLabel="Exposed to second-hand smoke?"
                    value={editedData.d_isSmoker === "yes"}
                    editable={editMode}
                    onChange={(checked) => setEditedData({ ...editedData, d_isSmoker: checked ? "yes" : "no" })}
                    positiveText="Yes"
                    negativeText="No"
                    changed={hasChanged('d_isSmoker')}
                  />
                  <SwitchField
                    icon={Pill}
                    label="Medication"
                    subLabel="Currently on medication?"
                    value={editedData.d_isMedication === "yes"}
                    editable={editMode}
                    onChange={(checked) => setEditedData({ ...editedData, d_isMedication: checked ? "yes" : "no" })}
                    positiveText="Yes"
                    negativeText="No"
                    changed={hasChanged('d_isMedication')}
                  />
                  <SwitchField
                    icon={Beer}
                    label="Alcohol Exposure"
                    subLabel="Accidental ingestion history?"
                    value={editedData.d_isAlcoholic === "yes"}
                    editable={editMode}
                    onChange={(checked) => setEditedData({ ...editedData, d_isAlcoholic: checked ? "yes" : "no" })}
                    positiveText="Yes"
                    negativeText="No"
                    changed={hasChanged('d_isAlcoholic')}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Stats & Quick Info */}
          <div className="space-y-6">
            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Donor Status</h3>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <div>
                  <p className="font-bold text-green-700 text-sm">Active Donor</p>
                  <p className="text-xs text-green-600">Profile visible to vets</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Donations" value="0" icon="🩸" />
                <StatCard label="Rating" value="5.0" icon="⭐" />
              </div>
            </section>

            <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Emergency Contact
              </h3>
              <p className="text-sm text-blue-700 mb-4">In case of urgent matching or issues during donation.</p>

              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                  <p className="text-xs text-gray-500">Provided at onboarding</p>
                  <p className="font-medium text-gray-900">{editedData.phone || "Not Set"}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

function ProfileField({ icon: Icon, label, value, editable, onChange, type = "text", options, locked, highlight, placeholder, suffix, helperText, changed }: any) {
  return (
    <div className={`flex items-start gap-3 group px-2 py-1 rounded-lg transition-colors ${changed ? 'bg-yellow-50 -mx-2 px-2' : ''}`}>
      <Icon className={`w-5 h-5 mt-0.5 ${locked ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-600'}`} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          {changed && <span className="text-[10px] uppercase font-bold text-yellow-600 bg-yellow-100 px-1.5 rounded">Changed</span>}
        </div>

        {editable && !locked ? (
          type === "select" ? (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt: string) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="relative">
              <Input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
              {suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
                  {suffix}
                </span>
              )}
            </div>
          )
        ) : (
          <div className="flex items-center gap-2 h-10">
            <p className={`text-base text-gray-900 ${highlight || ''} truncate`}>
              {value || <span className="text-gray-400 italic">Not provided</span>}
            </p>
            {locked && <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-1"><Shield className="w-3 h-3" /> Locked</span>}
          </div>
        )}
        {helperText && <p className="text-xs text-gray-400 mt-1">{helperText}</p>}
      </div>
    </div>
  );
}

function SwitchField({ icon: Icon, label, subLabel, value, editable, onChange, positiveText, negativeText, changed }: any) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${value ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-100'
      } ${changed ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}>
      <div className={`p-2 rounded-full ${value ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-700">{label}</p>
        <p className="text-xs text-gray-500">{subLabel}</p>
      </div>
      {editable ? (
        <Switch checked={value} onCheckedChange={onChange} />
      ) : (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${value ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
          }`}>
          {value ? positiveText : negativeText}
        </span>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color = "text-gray-900" }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 text-center shadow-sm">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
