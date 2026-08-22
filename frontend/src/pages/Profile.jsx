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
  Camera,
  Sparkles,
  Check,
  ArrowUpRight,
} from "lucide-react";

import { useState, useEffect, useRef } from "react";


function Profile() {

  // =================================================
  // REDUX
  // =================================================

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();


  // =================================================
  // PROFILE STATES
  // =================================================

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  // This will contain the image as base64
  const [profileImage, setProfileImage] = useState("");

  // This is what we display on screen
  const [imagePreview, setImagePreview] = useState("");


  const [loading, setLoading] = useState(false);


  // =================================================
  // TOAST
  // =================================================

  const {
    toast,
    showToast,
    hideToast
  } = useToast();


  // =================================================
  // FILE INPUT
  // =================================================

  const fileInputRef = useRef(null);


  // =================================================
  // LOAD USER DATA FROM REDUX
  // =================================================

  useEffect(() => {

    if (user) {

      setFullname(user.fullname || "");

      setEmail(user.email || "");

      setContact(user.contact || "");

      setLocation(user.location || "");

      // Load saved profile photo
      setProfileImage(user.profilePhoto || "");

      setImagePreview(
        user.profilePhoto || ""
      );

    }

  }, [user]);


  // =================================================
  // GET PROFILE FROM DATABASE
  // =================================================

  useEffect(() => {

    const getProfile = async () => {

      try {

        const response =
          await axiosInstance.get(
            "/api/v1/user/profile"
          );


        if (response.data.success) {

          const fetchedUser =
            response.data.user;


          // Update Redux
          dispatch(
            setUser(fetchedUser)
          );


          // Update local states
          setFullname(
            fetchedUser.fullname || ""
          );

          setEmail(
            fetchedUser.email || ""
          );

          setContact(
            fetchedUser.contact || ""
          );

          setLocation(
            fetchedUser.location || ""
          );


          // Profile photo
          setProfileImage(
            fetchedUser.profilePhoto || ""
          );

          setImagePreview(
            fetchedUser.profilePhoto || ""
          );

        }

      } catch (error) {

        console.log(
          "Error getting profile:",
          error
        );

        showToast(
          error.response?.data?.message ||
          "Unable to load profile",
          "error"
        );

      }

    };


    getProfile();

  }, [dispatch]);


  // =================================================
  // SELECT IMAGE
  // =================================================

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];


    if (!file) {
      return;
    }


    // =================================================
    // CHECK IMAGE TYPE
    // =================================================

    if (!file.type.startsWith("image/")) {

      showToast(
        "Please select an image file.",
        "error"
      );

      return;
    }


    // =================================================
    // CHECK IMAGE SIZE
    // =================================================

    if (file.size > 2 * 1024 * 1024) {

      showToast(
        "Image size should be less than 2 MB.",
        "error"
      );

      return;
    }


    // =================================================
    // CONVERT IMAGE TO BASE64
    // =================================================

    const reader = new FileReader();


    reader.onloadend = () => {

      const base64Image =
        reader.result;


      // Save image for sending
      // to backend
      setProfileImage(
        base64Image
      );


      // Immediately show image
      setImagePreview(
        base64Image
      );

    };


    reader.readAsDataURL(file);

  };


  // =================================================
  // OPEN FILE PICKER
  // =================================================

  const handleChoosePhoto = () => {

    fileInputRef.current?.click();

  };


  // =================================================
  // UPDATE PROFILE
  // =================================================

  const updateProfile = async (e) => {

    e.preventDefault();


    // =================================================
    // VALIDATION
    // =================================================

    if (
      !fullname ||
      !email ||
      !contact
    ) {

      showToast(
        "Full name, email and contact are required.",
        "error"
      );

      return;
    }


    // =================================================
    // CONTACT VALIDATION
    // =================================================

    const contactRegex =
      /^[0-9]{10}$/;


    if (!contactRegex.test(contact)) {

      showToast(
        "Contact number must contain exactly 10 digits.",
        "error"
      );

      return;
    }


    try {

      setLoading(true);


      showToast(
        "Updating profile...",
        "loading"
      );


      // =================================================
      // SEND DATA TO BACKEND
      // =================================================

      const response =
        await axiosInstance.put(
          "/api/v1/user/profile",
          {
            fullname: fullname,
            email: email,
            contact: contact,
            location: location,
            profilePhoto: profileImage
          }
        );


      // =================================================
      // SUCCESS
      // =================================================

      if (response.data.success) {

        const updatedUser =
          response.data.user;


        // =================================================
        // UPDATE REDUX
        // =================================================

        dispatch(
          setUser(updatedUser)
        );


        // =================================================
        // UPDATE LOCAL STATES
        // =================================================

        setFullname(
          updatedUser.fullname || ""
        );

        setEmail(
          updatedUser.email || ""
        );

        setContact(
          updatedUser.contact || ""
        );

        setLocation(
          updatedUser.location || ""
        );


        setProfileImage(
          updatedUser.profilePhoto || ""
        );

        setImagePreview(
          updatedUser.profilePhoto || ""
        );


        // =================================================
        // SUCCESS TOAST
        // =================================================

        showToast(
          response.data.message ||
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


  // =================================================
  // UI
  // =================================================

  return (

    <Layout>

      <div className="relative min-h-screen overflow-hidden bg-[#050008] px-5 py-12 text-white sm:px-8 lg:px-12">


        {/* ================================================= */}
        {/* BACKGROUND GLOW */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute left-[-220px] top-[100px] h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[150px]" />

        <div className="pointer-events-none absolute right-[-220px] top-[350px] h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[150px]" />

        <div className="pointer-events-none absolute bottom-[-250px] left-[40%] h-[500px] w-[500px] rounded-full bg-purple-800/10 blur-[150px]" />


        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="relative z-10 mx-auto max-w-7xl">


          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mb-10">

            <div className="mb-5 flex items-center gap-2">

              <div className="h-px w-8 bg-purple-500" />

              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b56cff]">
                Your Profile
              </span>

            </div>


            <h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">

              About{" "}

              <span className="bg-gradient-to-r from-white via-[#d8b4fe] to-[#a855f7] bg-clip-text text-transparent">
                Me
              </span>

            </h1>


            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Manage your personal information,
              account details and profile.
            </p>

          </div>


          {/* ================================================= */}
          {/* MAIN GRID */}
          {/* ================================================= */}

          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">


            {/* ================================================= */}
            {/* LEFT PROFILE CARD */}
            {/* ================================================= */}

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0810] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">


              {/* PURPLE GLOW */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/20 blur-[80px]" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-[80px]" />


              {/* TOP PURPLE LINE */}

              <div className="absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />


              {/* ================================================= */}
              {/* PROFILE IMAGE */}
              {/* ================================================= */}

              <div className="relative z-10 flex flex-col items-center">

                <div className="relative">


                  {/* OUTER GLOW */}

                  <div className="absolute -inset-4 rounded-full bg-purple-600/20 blur-xl" />


                  {/* IMAGE */}

                  <button
                    type="button"
                    onClick={handleChoosePhoto}
                    className="group relative h-36 w-36 overflow-hidden rounded-full border-2 border-purple-400/50 bg-[#160d20] shadow-[0_0_40px_rgba(168,85,247,0.25)]"
                  >

                    {imagePreview ? (

                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full w-full items-center justify-center">

                        <User className="h-14 w-14 text-purple-400" />

                      </div>

                    )}


                    {/* HOVER */}

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 opacity-0 transition group-hover:opacity-100">

                      <Camera className="h-6 w-6 text-white" />

                      <span className="mt-2 text-[10px] uppercase tracking-widest text-gray-300">
                        Change
                      </span>

                    </div>

                  </button>


                  {/* CHECK */}

                  <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0c0810] bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">

                    <Check className="h-4 w-4 text-white" />

                  </div>


                  {/* FILE INPUT */}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </div>


                {/* CHANGE PHOTO */}

                <button
                  type="button"
                  onClick={handleChoosePhoto}
                  className="relative z-10 mt-5 text-xs font-medium text-[#b56cff] transition hover:text-[#d8b4fe]"
                >
                  Change Photo
                </button>


                {/* NAME */}

                <h2 className="relative z-10 mt-3 text-2xl font-medium tracking-tight text-white">
                  {fullname || "User"}
                </h2>


                {/* ROLE */}

                <p className="relative z-10 mt-1 text-sm text-gray-500">
                  {user?.role || "Student"}
                </p>

              </div>


              {/* ================================================= */}
              {/* DIVIDER */}
              {/* ================================================= */}

              <div className="relative z-10 my-7 h-px bg-white/[0.07]" />


              {/* ================================================= */}
              {/* PROFILE STATS */}
              {/* ================================================= */}

              <div className="relative z-10 space-y-4">


                {/* APPLICATIONS */}

                <div className="flex items-center justify-between">

                  <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
                    Applications
                  </span>

                  <span className="text-sm font-medium text-[#c084fc]">
                    0
                  </span>

                </div>


                {/* COMPLETION */}

                <div className="flex items-center justify-between">

                  <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
                    Completion
                  </span>

                  <span className="text-sm font-medium text-purple-300">
                    80%
                  </span>

                </div>


                {/* ROLE */}

                <div className="flex items-center justify-between">

                  <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
                    Role
                  </span>

                  <span className="text-sm font-medium text-gray-300">
                    {user?.role || "Student"}
                  </span>

                </div>


                {/* LOCATION */}

                <div className="flex items-center justify-between">

                  <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
                    Location
                  </span>

                  <span className="max-w-[150px] truncate text-sm font-medium text-gray-300">
                    {location || "Not added"}
                  </span>

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* RIGHT SIDE */}
            {/* ================================================= */}

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0810] shadow-[0_20px_80px_rgba(0,0,0,0.35)]">


              {/* TOP GLOW */}

              <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[70%] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[70px]" />


              {/* TOP LINE */}

              <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-purple-500/70 to-transparent" />


              {/* ================================================= */}
              {/* TABS */}
              {/* ================================================= */}

              <div className="relative z-10 flex overflow-x-auto border-b border-white/[0.07]">

                <button
                  type="button"
                  className="flex shrink-0 items-center gap-2 border-b-2 border-purple-500 px-5 py-5 text-sm font-medium text-[#c084fc]"
                >

                  <User className="h-4 w-4" />

                  Account

                </button>

              </div>


              {/* ================================================= */}
              {/* FORM */}
              {/* ================================================= */}

              <form
                onSubmit={updateProfile}
                className="relative z-10 p-6 sm:p-8 lg:p-10"
              >


                {/* FORM HEADER */}

                <div className="mb-8">

                  <div className="mb-3 flex items-center gap-2">

                    <Sparkles className="h-4 w-4 text-purple-400" />

                    <span className="text-[10px] uppercase tracking-[0.25em] text-purple-400">
                      Personal Information
                    </span>

                  </div>


                  <h2 className="text-2xl font-medium text-white">
                    Account Settings
                  </h2>


                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Manage your personal information
                    and account details.
                  </p>

                </div>


                {/* ================================================= */}
                {/* FORM GRID */}
                {/* ================================================= */}

                <div className="grid gap-6 md:grid-cols-2">


                  {/* FULL NAME */}

                  <div>

                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                      Full Name
                    </label>

                    <div className="relative">

                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />

                      <input
                        type="text"
                        value={fullname}
                        onChange={(e) =>
                          setFullname(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-purple-500/60 focus:bg-purple-500/[0.03] focus:ring-1 focus:ring-purple-500/20"
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-purple-500/60 focus:bg-purple-500/[0.03] focus:ring-1 focus:ring-purple-500/20"
                      />

                    </div>

                  </div>


                  {/* PHONE */}

                  <div>

                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />

                      <input
                        type="text"
                        value={contact}
                        onChange={(e) =>
                          setContact(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-purple-500/60 focus:bg-purple-500/[0.03] focus:ring-1 focus:ring-purple-500/20"
                      />

                    </div>

                  </div>


                  {/* ROLE */}

                  <div>

                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                      Role
                    </label>

                    <div className="relative">

                      <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />

                      <input
                        type="text"
                        value={user?.role || ""}
                        readOnly
                        className="w-full rounded-xl border border-white/[0.06] bg-white/[0.015] py-3.5 pl-11 pr-4 text-sm text-gray-500 outline-none"
                      />

                    </div>

                  </div>


                  {/* LOCATION */}

                  <div>

                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                      Location
                    </label>

                    <div className="relative">

                      <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />

                      <input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) =>
                          setLocation(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-purple-500/60 focus:bg-purple-500/[0.03] focus:ring-1 focus:ring-purple-500/20"
                      />

                    </div>

                  </div>


                  {/* ACCOUNT STATUS */}

                  <div>

                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                      Account Status
                    </label>

                    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] px-4 py-3.5">

                      <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />

                      <span className="text-sm text-gray-400">
                        Active
                      </span>

                    </div>

                  </div>

                </div>


                {/* ================================================= */}
                {/* UPDATE BUTTON */}
                {/* ================================================= */}

                <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center">

                  <p className="text-xs text-gray-700">
                    Keep your profile information
                    up to date.
                  </p>


                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9333ea] to-[#b45cff] px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_25px_rgba(168,85,247,0.18)] transition hover:from-[#a855f7] hover:to-[#c084fc] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading
                      ? "Updating..."
                      : "Update Profile"
                    }

                    {!loading && (
                      <ArrowUpRight className="h-4 w-4" />
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* TOAST */}
        {/* ================================================= */}

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