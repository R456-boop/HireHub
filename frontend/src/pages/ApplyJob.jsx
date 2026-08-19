import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
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

      // Show custom success popup
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

      // Check if user already applied
      if (message.toLowerCase().includes("already applied")) {
        setPopup({
          show: true,
          title: "Already Applied",
          message: "You have already applied for this job.",
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

  return (
    <Layout>
      {/* ========================================= */}
      {/* MAIN PAGE */}
      {/* ========================================= */}

      <div className="min-h-[calc(100vh-70px)] bg-[#b78bea] px-4 py-10 sm:px-6 lg:px-8">

        {/* ========================================= */}
        {/* BLACK MAIN CONTAINER */}
        {/* ========================================= */}

        <div className="mx-auto max-w-5xl rounded-[35px] bg-[#111111] px-5 py-12 text-white shadow-2xl sm:px-10 lg:px-16">

          {/* ========================================= */}
          {/* HEADER */}
          {/* ========================================= */}

          <div className="text-center">

            {/* SMALL LABEL */}

            <div className="mb-5 flex justify-center">
              <span className="rounded-full bg-[#b78bea] px-5 py-2 text-xs font-black uppercase tracking-[0.15em] text-black">
                Career Opportunity
              </span>
            </div>

            {/* HEADING */}

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Apply for{" "}
              <span className="text-[#b78bea]">
                Job
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              Take the next step toward your career and submit your
              application to the recruiter.
            </p>

          </div>

          {/* ========================================= */}
          {/* APPLICATION CARD */}
          {/* ========================================= */}

          <div className="mx-auto mt-12 max-w-2xl rounded-[32px] border border-[#2d2d2d] bg-[#191919] p-6 shadow-xl sm:p-10">

            {/* ICON */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#b78bea] shadow-lg">

              <span className="text-3xl">
                💼
              </span>

            </div>

            {/* TITLE */}

            <h2 className="mt-7 text-center text-3xl font-black">
              Ready to apply?
            </h2>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-4 max-w-md text-center leading-7 text-gray-400">
              Your application will be sent directly to the recruiter.
              Make sure your profile information is up to date before
              applying.
            </p>

            {/* INFORMATION BOX */}

            <div className="mt-7 rounded-2xl border border-[#303030] bg-[#111111] p-5">

              <div className="flex items-start gap-4">

                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b78bea]/20">
                  <span className="text-lg">
                    ✓
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    Profile information
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your current profile details will be shared with
                    the recruiter along with your application.
                  </p>
                </div>

              </div>

            </div>

            {/* APPLY BUTTON */}

            <Button
              className="mt-8 h-12 w-full rounded-xl bg-[#b78bea] text-base font-black text-black transition-all hover:bg-[#a970df] hover:scale-[1.01]"
              onClick={applyForJob}
              disabled={loading}
            >
              {loading ? "Applying..." : "Submit Application"}
            </Button>

          </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* CUSTOM POPUP */}
      {/* ========================================= */}

      {popup.show && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          {/* POPUP CARD */}

          <div className="w-full max-w-md rounded-[30px] border border-[#3a3a3a] bg-[#111111] p-7 text-white shadow-2xl sm:p-9">

            {/* ICON */}

            <div className="flex justify-center">

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  popup.type === "success"
                    ? "bg-green-500/15"
                    : popup.type === "warning"
                    ? "bg-[#b78bea]/15"
                    : "bg-red-500/15"
                }`}
              >

                <span
                  className={`text-4xl ${
                    popup.type === "success"
                      ? "text-green-400"
                      : popup.type === "warning"
                      ? "text-[#b78bea]"
                      : "text-red-400"
                  }`}
                >
                  {popup.type === "success"
                    ? "✓"
                    : popup.type === "warning"
                    ? "!"
                    : "×"}
                </span>

              </div>

            </div>

            {/* TITLE */}

            <h2 className="mt-6 text-center text-2xl font-black sm:text-3xl">
              {popup.title}
            </h2>

            {/* MESSAGE */}

            <p className="mx-auto mt-3 max-w-sm text-center leading-6 text-gray-400">
              {popup.message}
            </p>

            {/* BUTTON */}

            <button
              onClick={closePopup}
              className="mt-7 h-12 w-full rounded-xl bg-[#b78bea] text-sm font-black text-black transition hover:bg-[#a970df]"
            >
              {popup.type === "error" ? "Close" : "OK"}
            </button>

          </div>

        </div>
      )}
    </Layout>
  );
}

export default ApplyJob;