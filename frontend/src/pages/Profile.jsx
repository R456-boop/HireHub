import { useSelector,useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import Layout from "../components/Layout";
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
} from "lucide-react";
import { useState,useEffect } from "react";
import axiosInstance from "../utils/axios";
function Profile() {
  const user = useSelector((state) => state.auth.user);
const dispatch =useDispatch();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setEmail(user.email || "");
      setContact(user.contact || "");
    }
  }, [user]);

const updateProfile = async () => {
  console.log("UPDATE BUTTON CLICKED");

  try {
    const response = await axiosInstance.put(
      "/api/v1/user/profile",
      { fullname, email, contact }
    );

    console.log("UPDATE RESPONSE:", response.data);

    if (response.data.success) {
      dispatch(setUser(response.data.user)); // <-- ADD THIS
      alert("Profile updated successfully!");
    }

  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to update profile");
  }
};
        

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

              {/* Profile picture */}

              <div className="flex flex-col items-center">

                <div className="relative">

                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                  />

                  <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                    ✓
                  </div>

                </div>


                <h2 className="mt-4 text-lg font-bold text-gray-900">
                  {user?.fullname || "User"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {user?.role || "Student"}
                </p>

              </div>


              {/* Divider */}

              <div className="my-6 border-t border-gray-200"></div>


              {/* Profile statistics */}

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Applications
                  </span>

                  <span className="font-semibold text-blue-600">
                    0
                  </span>

                </div>


                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Profile completion
                  </span>

                  <span className="font-semibold text-green-600">
                    80%
                  </span>

                </div>


                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Role
                  </span>

                  <span className="font-semibold text-gray-900">
                    {user?.role || "Student"}
                  </span>

                </div>

              </div>


              {/* Public profile button */}

              <button
                className="mt-7 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                View Public Profile
              </button>

            </div>



            {/* ================= RIGHT SIDE ================= */}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">


              {/* Tabs */}

              <div className="flex overflow-x-auto border-b border-gray-200">

                <button className="flex items-center gap-2 border-b-2 border-blue-600 px-5 py-4 text-sm font-semibold text-blue-600">

                  <User className="h-4 w-4" />

                  Account Settings

                </button>


                <button className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900">

                  <Building2 className="h-4 w-4" />

                  Company Settings

                </button>


                <button className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900">

                  <FileText className="h-4 w-4" />

                  Documents

                </button>


                <button className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900">

                  <Shield className="h-4 w-4" />

                  Security

                </button>


                <button className="flex items-center gap-2 px-5 py-4 text-sm text-gray-500 hover:text-gray-900">

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


                  {/* FIRST NAME */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <div className="relative">

                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        value={fullname }
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>



                  {/* EMAIL */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-500"
/>

                    </div>

                  </div>



                  {/* PHONE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
  type="text"
  value={contact}
  onChange={(e) => setContact(e.target.value)}
  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-500"
/>

                    </div>

                  </div>



                  {/* ROLE */}

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



                  {/* LOCATION */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Location
                    </label>

                    <div className="relative">

                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        placeholder="Enter your location"
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500"
                      />

                    </div>

                  </div>



                  {/* ACCOUNT STATUS */}

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
                    className="rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                 type="button"
                 onClick={updateProfile}
                
                 >
                    Update Profile
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Profile;