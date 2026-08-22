import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Check,
  UserRound,
  Briefcase,
  Send,
  ArrowRight,
} from "lucide-react";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // =========================
  // POPUP STATE
  // =========================

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "error",
  });

  // =========================
  // APPLY FOR JOB
  // =========================

  const applyForJob = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post(
        `/api/v1/application/apply/${id}`
      );

      setPopup({
        show: true,
        title: "Application Submitted!",
        message:
          response.data.message ||
          "Your application has been submitted successfully.",
        type: "success",
      });
    } catch (error) {
      console.log("Error applying for job:", error);

      const message =
        error.response?.data?.message ||
        "Something went wrong while applying";

      // =========================
      // ALREADY APPLIED
      // =========================

      if (message.toLowerCase().includes("already applied")) {
        setPopup({
          show: true,
          title: "Already Applied",
          message:
            "You have already applied for this job. You can check your application status from My Applications.",
          type: "warning",
        });
      } else {
        setPopup({
          show: true,
          title: "Application Failed",
          message: message,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLOSE POPUP
  // =========================

  const closePopup = () => {
    const shouldNavigate =
      popup.type === "success" || popup.type === "warning";

    setPopup({
      show: false,
      title: "",
      message: "",
      type: "error",
    });

    if (shouldNavigate) {
      navigate("/jobs");
    }
  };

  // =========================
  // MAIN UI
  // =========================

  return (
    <Layout>

      <div className="min-h-[calc(100vh-70px)] overflow-hidden bg-[#050008] px-3 py-5 text-white sm:px-5 sm:py-8 lg:px-8">

        {/* ================================================= */}
        {/* MAIN BLACK CONTAINER */}
        {/* ================================================= */}

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[35px] border border-white/[0.08] bg-[#09070d] shadow-2xl">

          {/* ================================================= */}
          {/* BACKGROUND PURPLE GLOW */}
          {/* ================================================= */}

          <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[140px]" />

          <div className="pointer-events-none absolute -right-40 top-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[140px]" />

          <div className="pointer-events-none absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-purple-800/20 blur-[140px]" />


          {/* ================================================= */}
          {/* TOP SECTION */}
          {/* ================================================= */}

          <div className="relative z-10 grid min-h-[650px] lg:grid-cols-[0.9fr_1.1fr]">

            {/* ================================================= */}
            {/* LEFT CONTENT */}
            {/* ================================================= */}

            <div className="flex items-center px-7 py-14 sm:px-12 lg:px-14">

              <div className="max-w-xl">

                {/* SMALL LABEL */}

                <div className="mb-8">

                  <span className="rounded-md bg-[#a982ff] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">
                    Career Opportunity
                  </span>

                </div>


                {/* HEADING */}

                <h1 className="text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[70px]">

                  Take the
                  <br />

                  <span className="text-white">
                    next step.
                  </span>

                </h1>


                {/* PURPLE TEXT */}

                <h2 className="mt-2 text-4xl font-medium tracking-[-0.03em] text-[#b78bea] sm:text-5xl">

                  Apply with confidence.

                </h2>


                {/* DESCRIPTION */}

                <p className="mt-7 max-w-md text-sm leading-7 text-gray-500 sm:text-base">

                  Take the next step toward your career and submit your
                  application directly to the recruiter.

                </p>


                {/* SMALL CHECK */}

                <div className="mt-8 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#281d36]">

                    <Check className="h-4 w-4 text-[#b78bea]" />

                  </div>

                  <p className="text-sm text-gray-400">
                    Your profile information is ready to share.
                  </p>

                </div>


                {/* APPLY BUTTON */}

                <button
                  onClick={applyForJob}
                  disabled={loading}
                  className="mt-9 flex h-12 items-center gap-3 rounded-xl bg-[#b78bea] px-7 text-sm font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-[#c79df3] hover:shadow-[0_0_35px_rgba(183,139,234,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading
                    ? "Submitting..."
                    : "Submit Application"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4" />
                  )}

                </button>

              </div>

            </div>


            {/* ================================================= */}
            {/* RIGHT PURPLE CARDS */}
            {/* ================================================= */}

            <div className="relative hidden min-h-[650px] lg:block">

              {/* PURPLE LIGHT */}

              <div className="pointer-events-none absolute right-[-100px] top-[60px] h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[120px]" />


              {/* ================================================= */}
              {/* CARD 1 */}
              {/* ================================================= */}

              <div className="absolute right-[-10px] top-[70px] z-30 w-[550px] rounded-l-[24px] bg-[#7652d8] px-10 py-8 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">

                {/* LABEL */}

                <div className="absolute -left-[50px] -top-3 rounded-md bg-[#a982ff] px-3 py-1 text-[9px] font-semibold text-black">
                  Application 1
                </div>


                <div className="grid grid-cols-[1fr_1.15fr] gap-8">

                  <div>

                    <h2 className="text-xl font-medium leading-tight">
                      Profile
                      <br />
                      Information
                    </h2>

                  </div>


                  <div className="flex gap-3">

                    <UserRound className="mt-1 h-5 w-5 shrink-0 text-white/80" />

                    <p className="text-sm leading-6 text-white/75">
                      Your current profile details will be shared with the
                      recruiter along with your application.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================================================= */}
              {/* CARD 2 */}
              {/* ================================================= */}

              <div className="absolute right-[-10px] top-[220px] z-20 w-[550px] rounded-l-[24px] bg-[#503a9e] px-10 py-8 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">

                {/* LABEL */}

                <div className="absolute -left-[50px] -top-3 rounded-md bg-[#a982ff] px-3 py-1 text-[9px] font-semibold text-black">
                  Application 2
                </div>


                <div className="grid grid-cols-[1fr_1.15fr] gap-8">

                  <div>

                    <h2 className="text-xl font-medium leading-tight">
                      Job
                      <br />
                      Application
                    </h2>

                  </div>


                  <div className="flex gap-3">

                    <Briefcase className="mt-1 h-5 w-5 shrink-0 text-white/70" />

                    <p className="text-sm leading-6 text-white/70">
                      Your application will be sent directly to the recruiter
                      for consideration.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================================================= */}
              {/* CARD 3 */}
              {/* ================================================= */}

              <div className="absolute right-[-10px] top-[370px] z-10 w-[550px] rounded-l-[24px] bg-[#33266d] px-10 py-8 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">

                {/* LABEL */}

                <div className="absolute -left-[50px] -top-3 rounded-md bg-[#a982ff] px-3 py-1 text-[9px] font-semibold text-black">
                  Application 3
                </div>


                <div className="grid grid-cols-[1fr_1.15fr] gap-8">

                  <div>

                    <h2 className="text-xl font-medium leading-tight">
                      Recruiter
                      <br />
                      Review
                    </h2>

                  </div>


                  <div className="flex gap-3">

                    <Send className="mt-1 h-5 w-5 shrink-0 text-white/60" />

                    <p className="text-sm leading-6 text-white/60">
                      Once submitted, the recruiter can review your profile
                      and application.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================================================= */}
              {/* BOTTOM FLOATING CARD */}
              {/* ================================================= */}

              <div className="absolute bottom-[35px] right-[70px] z-40 flex items-center gap-3 rounded-xl border border-white/10 bg-[#111111]/95 px-5 py-4 shadow-2xl backdrop-blur-xl">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2b2039]">

                  <Check className="h-4 w-4 text-[#b78bea]" />

                </div>

                <div>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-gray-600">
                    Ready
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    Start your application
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* MOBILE INFORMATION CARDS */}
          {/* ================================================= */}

          <div className="grid gap-3 px-5 pb-7 lg:hidden">

            {/* CARD 1 */}

            <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5">

              <UserRound className="h-5 w-5 text-[#b78bea]" />

              <h3 className="mt-4 text-lg font-medium">
                Profile Information
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your current profile details will be shared with the
                recruiter.
              </p>

            </div>


            {/* CARD 2 */}

            <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5">

              <Briefcase className="h-5 w-5 text-[#b78bea]" />

              <h3 className="mt-4 text-lg font-medium">
                Job Application
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your application will be sent directly to the recruiter.
              </p>

            </div>


            {/* CARD 3 */}

            <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5">

              <Send className="h-5 w-5 text-[#b78bea]" />

              <h3 className="mt-4 text-lg font-medium">
                Recruiter Review
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                The recruiter can review your application after submission.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ===================================================== */}
      {/* CUSTOM POPUP */}
      {/* ===================================================== */}

      {popup.show && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-7 text-white shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:p-9">


            {/* TOP PURPLE GLOW */}

            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[70px]" />


            {/* ICON */}

            <div className="relative flex justify-center">

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  popup.type === "success"
                    ? "bg-green-500/10"
                    : popup.type === "warning"
                    ? "bg-[#b78bea]/10"
                    : "bg-red-500/10"
                }`}
              >

                {popup.type === "success" && (
                  <Check className="h-9 w-9 text-green-400" />
                )}

                {popup.type === "warning" && (
                  <span className="text-4xl font-medium text-[#b78bea]">
                    !
                  </span>
                )}

                {popup.type === "error" && (
                  <span className="text-4xl font-medium text-red-400">
                    ×
                  </span>
                )}

              </div>

            </div>


            {/* TITLE */}

            <h2 className="relative mt-6 text-center text-2xl font-medium sm:text-3xl">

              {popup.title}

            </h2>


            {/* MESSAGE */}

            <p className="relative mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-gray-500">

              {popup.message}

            </p>


            {/* BUTTONS */}

            <div className="relative mt-7 flex gap-3">

              {/* CLOSE */}

              <button
                onClick={closePopup}
                className="flex-1 rounded-xl border border-white/10 bg-[#191919] px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#222222]"
              >

                {popup.type === "error"
                  ? "Close"
                  : "OK"}

              </button>


              {/* MY APPLICATIONS */}

              {(popup.type === "success" ||
                popup.type === "warning") && (

                <button
                  onClick={() => navigate("/applications")}
                  className="flex-1 rounded-xl bg-[#b78bea] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#c99df4]"
                >

                  My Applications

                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </Layout>
  );
}

export default ApplyJob;