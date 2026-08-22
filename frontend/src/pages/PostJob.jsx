import { useState } from "react";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceneed: "",
    jobType: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  // =================================================
  // POPUP STATE
  // =================================================

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  // =================================================
  // HANDLE INPUT
  // =================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =================================================
  // CLOSE POPUP
  // =================================================

  const closePopup = () => {
    setPopup({
      show: false,
      title: "",
      message: "",
      type: "success",
    });
  };

  // =================================================
  // SUBMIT JOB
  // =================================================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/api/v1/job/post",
        formData
      );

      // =============================================
      // SUCCESS POPUP
      // =============================================

      setPopup({
        show: true,
        title: "Job Posted Successfully!",
        message:
          response.data.message ||
          "Your job opportunity has been successfully published.",
        type: "success",
      });

      // =============================================
      // CLEAR FORM
      // =============================================

      setFormData({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experienceneed: "",
        jobType: "",
        position: "",
        companyId: "",
      });

    } catch (error) {
      console.log("Error posting job:", error);

      // =============================================
      // ERROR POPUP
      // =============================================

      setPopup({
        show: true,
        title: "Unable to Post Job",
        message:
          error.response?.data?.message ||
          "Something went wrong while posting the job.",
        type: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      {/* ================================================= */}
      {/* PAGE */}
      {/* ================================================= */}

      <div className="min-h-[calc(100vh-70px)] bg-[#08000f] px-4 py-10 text-white sm:px-6 lg:px-10">

        {/* ================================================= */}
        {/* MAIN CONTAINER */}
        {/* ================================================= */}

        <div className="mx-auto max-w-6xl">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mb-10">

            {/* SMALL LABEL */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8b3dff]/40 bg-[#8b3dff]/10 px-4 py-2">

              <span className="text-sm text-[#c084fc]">
                ✦
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c084fc]">
                Career Opportunities
              </span>

            </div>

            {/* HEADING */}

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

              Post a new{" "}

              <span className="bg-gradient-to-r from-[#b78bea] via-[#d946ef] to-[#a855f7] bg-clip-text text-transparent">
                opportunity.
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Create a new job opportunity and connect with talented
              candidates looking for their next career move.
            </p>

          </div>


          {/* ================================================= */}
          {/* FORM CARD */}
          {/* ================================================= */}

          <form
            onSubmit={submitHandler}
            className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#100b16] p-6 shadow-2xl sm:p-8 lg:p-10"
          >

            {/* ================================================= */}
            {/* PURPLE GLOW */}
            {/* ================================================= */}

            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-600/20 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[100px]" />


            {/* ================================================= */}
            {/* FORM HEADER */}
            {/* ================================================= */}

            <div className="relative mb-8">

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Create your job listing
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Fill in the details below to publish your opportunity.
              </p>

            </div>


            {/* ================================================= */}
            {/* BASIC INFORMATION */}
            {/* ================================================= */}

            <div className="relative grid gap-6 sm:grid-cols-2">


              {/* JOB TITLE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Job Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                  className="h-14 w-full rounded-xl border border-white/[0.08] bg-[#17111d] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
                />

              </div>


              {/* LOCATION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Location
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore"
                  required
                  className="h-14 w-full rounded-xl border border-white/[0.08] bg-[#17111d] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
                />

              </div>


              {/* SALARY */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Salary
                </label>

                <input
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  required
                  className="h-14 w-full rounded-xl border border-white/[0.08] bg-[#17111d] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
                />

              </div>


              {/* EXPERIENCE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Experience
                </label>

                <input
                  name="experienceneed"
                  value={formData.experienceneed}
                  onChange={handleChange}
                  placeholder="e.g. 2 years"
                  required
                  className="h-14 w-full rounded-xl border border-white/[0.08] bg-[#17111d] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
                />

              </div>


              {/* JOB TYPE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Job Type
                </label>

                <input
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  placeholder="e.g. Full Time"
                  required
                  className="h-14 w-full rounded-xl border border-white/[0.08] bg-[#17111d] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
                />

              </div>


              {/* POSITIONS */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Number of Positions
                </label>

                <input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  required
                  className="h-14 w-full rounded-xl border border-white/[0.08] bg-[#17111d] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
                />

              </div>

            </div>


            {/* ================================================= */}
            {/* COMPANY ID */}
            {/* ================================================= */}

            <div className="relative mt-6">

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Company ID
              </label>

              <input
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                placeholder="Enter your company ID"
                required
                className="h-14 w-full rounded-xl border border-white/[0.08] bg-[#17111d] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
              />

            </div>


            {/* ================================================= */}
            {/* REQUIREMENTS */}
            {/* ================================================= */}

            <div className="relative mt-6">

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Requirements
              </label>

              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="HTML, CSS, JavaScript, React"
                required
                className="min-h-36 w-full resize-none rounded-xl border border-white/[0.08] bg-[#17111d] px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
              />

              <p className="mt-2 text-xs text-gray-600">
                Add the skills and qualifications candidates should have.
              </p>

            </div>


            {/* ================================================= */}
            {/* DESCRIPTION */}
            {/* ================================================= */}

            <div className="relative mt-6">

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Job Description
                <span className="ml-2 text-xs text-gray-600">
                  (Optional)
                </span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the job, responsibilities, team and what the candidate will work on..."
                className="min-h-44 w-full resize-none rounded-xl border border-white/[0.08] bg-[#17111d] px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20"
              />

              <p className="mt-2 text-xs text-gray-600">
                You can leave this empty if you don't want to add a description.
              </p>

            </div>


            {/* ================================================= */}
            {/* DIVIDER */}
            {/* ================================================= */}

            <div className="relative my-8 h-px bg-white/[0.07]" />


            {/* ================================================= */}
            {/* BOTTOM */}
            {/* ================================================= */}

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-medium text-gray-300">
                  Ready to publish?
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Your job will be visible to candidates after posting.
                </p>

              </div>


              {/* ================================================= */}
              {/* POST BUTTON */}
              {/* ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="h-12 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#c084fc] px-8 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-purple-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading
                  ? "Posting..."
                  : "Publish Job →"}

              </button>

            </div>

          </form>

        </div>

      </div>


      {/* ================================================= */}
      {/* CUSTOM POPUP */}
      {/* ================================================= */}

      {popup.show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          {/* ================================================= */}
          {/* POPUP CARD */}
          {/* ================================================= */}

          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#111111] p-7 text-white shadow-2xl sm:p-9">

            {/* PURPLE GLOW */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-600/20 blur-[70px]" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-fuchsia-600/10 blur-[70px]" />


            {/* ================================================= */}
            {/* ICON */}
            {/* ================================================= */}

            <div className="relative flex justify-center">

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  popup.type === "success"
                    ? "bg-[#a855f7]/15"
                    : "bg-red-500/15"
                }`}
              >

                <span
                  className={`text-4xl font-bold ${
                    popup.type === "success"
                      ? "text-[#c084fc]"
                      : "text-red-400"
                  }`}
                >
                  {popup.type === "success"
                    ? "✓"
                    : "×"}
                </span>

              </div>

            </div>


            {/* ================================================= */}
            {/* TITLE */}
            {/* ================================================= */}

            <h2 className="relative mt-6 text-center text-2xl font-bold sm:text-3xl">
              {popup.title}
            </h2>


            {/* ================================================= */}
            {/* MESSAGE */}
            {/* ================================================= */}

            <p className="relative mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-gray-400 sm:text-base">
              {popup.message}
            </p>


            {/* ================================================= */}
            {/* BUTTON */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={closePopup}
              className="relative mt-7 h-12 w-full rounded-xl bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-purple-500/40"
            >
              {popup.type === "success"
                ? "Continue"
                : "Close"}
            </button>

          </div>

        </div>
      )}

    </Layout>
  );
}

export default PostJob;