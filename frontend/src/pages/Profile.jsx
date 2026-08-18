import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

import Toast from "@/components/Toast";
import { useToast } from "@/hooks/useToast";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";

import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Shield,
  FileText,
  Bell,
  Building2,
  Camera,
} from "lucide-react";

import { useState, useEffect, useRef } from "react";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // ================= PROFILE STATES =================

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Toast
  const { toast, showToast, hideToast } = useToast();

  // ================= PROFILE IMAGE =================

  const [profileImage, setProfileImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("/profile.jpg");

  const fileInputRef = useRef(null);

  // ================= LOAD USER DATA =================

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setEmail(user.email || "");
      setContact(user.contact || "");
    }
  }, [user]);

  // ================= IMAGE PREVIEW =================

  useEffect(() => {
    if (!profileImage) {
      return;
    }

    const imageUrl = URL.createObjectURL(profileImage);

    setImagePreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [profileImage]);

  // ================= SELECT IMAGE =================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.", "error");
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      showToast(
        "Image size should be less than 5 MB.",
        "error"
      );
      return;
    }

    // Save selected file
    setProfileImage(file);
  };

  // ================= OPEN FILE PICKER =================

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  // ================= UPDATE PROFILE =================

  const updateProfile = async () => {
    if (!fullname || !email) {
      showToast(
        "Full name and email are required.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      showToast("Updating profile...", "loading");

      const response = await axiosInstance.put(
        "/api/v1/user/profile",
        {
          fullname,
          email,
          contact,
        }
      );

      if (response.data.success) {
        // Update Redux user
        dispatch(setUser(response.data.user));

        showToast(
          "Profile updated successfully!",
          "success"
        );
      } else {
        showToast(
          response.data.message ||
            "Failed to update profile.",
          "error"
        );
      }
    } catch (error) {
      console.log(
        "UPDATE PROFILE ERROR:",
        error.response?.data || error
      );

      showToast(
        error.response?.data?.message ||
          "Failed to update profile.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  return (
    <Layout>

      <div className="min-h-screen bg-[#f5f7fb] px-4 py-8 sm:px-8">

        <div className="mx-auto max-w-7xl">

          {/* ================= HEADER ================= */}

          <div className="mb-8">

            <p className="text-sm font-medium text-gray-500">
              Profile
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Profile
            </h1>

          </div>

          {/* ================= MAIN PROFILE AREA ================= */}

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

            {/* ================= LEFT PROFILE CARD ================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

              {/* ================= PROFILE PHOTO ================= */}

              <div className="flex flex-col items-center">

                <div className="relative">

                  {/* CLICKABLE PHOTO */}

                  <button
                    type="button"
                    onClick={handleChoosePhoto}
                    className="group relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md"
                  >

                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />

                    {/* DARK HOVER OVERLAY */}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">

                      <Camera className="h-7 w-7 text-white" />

                    </div>

                  </button>

                  {/* PURPLE CHECK */}

                  <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white shadow">

                    ✓

                  </div>

                  {/* HIDDEN FILE INPUT */}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </div>

                {/* CHANGE PHOTO TEXT */}

                <button
                  type="button"
                  onClick={handleChoosePhoto}
                  className="mt-3 text-xs font-medium text-purple-600 hover:text-purple-700"
                >
                  Change Photo
                </button>

                <h2 className="mt-2 text-lg font-bold text-gray-900">
                  {user?.fullname || "User"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {user?.role || "Student"}
                </p>

              </div>

              {/* ================= DIVIDER ================= */}

              <div className="my-6 border-t border-gray-200"></div>

              {/* ================= PROFILE STATISTICS ================= */}

              <div className="space-y-4">

                {/* APPLICATIONS */}

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Applications
                  </span>

                  <span className="font-semibold text-purple-600">
                    0
                  </span>

                </div>

                {/* PROFILE COMPLETION */}

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Profile completion
                  </span>

                  <span className="font-semibold text-green-600">
                    80%
                  </span>

                </div>

                {/* ROLE */}

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Role
                  </span>

                  <span className="font-semibold text-gray-900">
                    {user?.role || "Student"}
                  </span>

                </div>

              </div>

              {/* ================= PUBLIC PROFILE ================= */}

              <button
                type="button"
                className="mt-7 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                View Public Profile
              </button>

            </div>

            {/* ================= RIGHT SIDE ================= */}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

              {/* ================= TABS ================= */}

              <div className="flex overflow-x-auto border-b border-gray-200">

                {/* ACCOUNT SETTINGS */}

                <button
                  type="button"
                  className="flex items-center gap-2 border-b-2 border-purple-600 px-5 py-4 text-sm font-semibold text-purple-600"
                >

                  <User className="h-4 w-4" />

                  Account Settings

                </button>

                {/* COMPANY SETTINGS */}

                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900"
                >

                  <Building2 className="h-4 w-4" />

                  Company Settings

                </button>

                {/* DOCUMENTS */}

                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900"
                >

                  <FileText className="h-4 w-4" />

                  Documents

                </button>

                {/* SECURITY */}

                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900"
                >

                  <Shield className="h-4 w-4" />

                  Security

                </button>

                {/* NOTIFICATIONS */}

                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900"
                >

                  <Bell className="h-4 w-4" />

                  Notifications

                </button>

              </div>

              {/* ================= ACCOUNT FORM ================= */}

              <div className="p-6 sm:p-8">

                <h2 className="text-xl font-bold text-gray-900">
                  Account Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your personal information and account details.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                  {/* ================= FULL NAME ================= */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <div className="relative">

                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        value={fullname}
                        onChange={(e) =>
                          setFullname(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />

                    </div>

                  </div>

                  {/* ================= EMAIL ================= */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />

                    </div>

                  </div>

                  {/* ================= PHONE ================= */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        value={contact}
                        onChange={(e) =>
                          setContact(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />

                    </div>

                  </div>

                  {/* ================= ROLE ================= */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Role
                    </label>

                    <div className="relative">

                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        value={user?.role || ""}
                        readOnly
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none"
                      />

                    </div>

                  </div>

                  {/* ================= LOCATION ================= */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Location
                    </label>

                    <div className="relative">

                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        placeholder="Enter your location"
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />

                    </div>

                  </div>

                  {/* ================= ACCOUNT STATUS ================= */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Account Status
                    </label>

                    <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">

                      <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                      <span className="text-sm font-medium text-gray-700">
                        Active
                      </span>

                    </div>

                  </div>

                </div>

                {/* ================= UPDATE BUTTON ================= */}

                <div className="mt-8 border-t border-gray-200 pt-6">

                  <button
                    type="button"
                    onClick={updateProfile}
                    disabled={loading}
                    className="rounded-lg bg-purple-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading
                      ? "Updating..."
                      : "Update Profile"}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= TOAST ================= */}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}

      </div>

    </Layout>
  );
}

export default Profile;