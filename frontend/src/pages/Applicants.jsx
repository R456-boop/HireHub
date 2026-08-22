import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  User,
  Mail,
  Check,
  X,
  Sparkles,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";

function Applicants() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =================================================
  // UPDATE APPLICATION STATUS
  // =================================================

  const updateStatus = async (applicationId, status) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/application/${applicationId}/status`,
        {
          status,
        }
      );

      console.log("Status updated:", response.data);

      setJob((previousJob) => ({
        ...previousJob,

        applications: previousJob.applications.map(
          (application) =>
            application._id === applicationId
              ? {
                  ...application,
                  status: status,
                }
              : application
        ),
      }));
    } catch (error) {
      console.log("Error updating status:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update application status"
      );
    }
  };

  // =================================================
  // GET APPLICANTS
  // =================================================

  useEffect(() => {
    const getApplicants = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Job ID:", id);

        const response = await axiosInstance.get(
          `/api/v1/application/${id}/applicants`
        );

        console.log("Applicants API response:", response.data);

        if (!response.data?.job) {
          setError("Job information was not returned by the server.");
          return;
        }

      setJob({
  ...response.data.job,
  applications: response.data.applications || [],
});
      } catch (error) {
        console.log(
          "ERROR GETTING APPLICANTS:",
          error
        );

        console.log(
          "SERVER RESPONSE:",
          error.response?.data
        );

        setError(
          error.response?.data?.message ||
            "Unable to load applicants."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getApplicants();
    } else {
      setError("Job ID is missing.");
      setLoading(false);
    }
  }, [id]);

  // =================================================
  // LOADING
  // =================================================

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#050008] px-5 py-16 text-white sm:px-8">
          <div className="mx-auto flex min-h-[500px] max-w-6xl items-center justify-center">
            <div className="text-center">

              <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-purple-500/20 border-t-purple-400" />

              <p className="text-sm text-gray-400">
                Loading applicants...
              </p>

            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // =================================================
  // ERROR
  // =================================================

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#050008] px-5 py-16 text-white sm:px-8">

          <div className="mx-auto flex min-h-[500px] max-w-6xl items-center justify-center">

            <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#110b18] p-8 text-center shadow-xl">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">

                <X className="h-8 w-8 text-red-400" />

              </div>

              <h1 className="text-2xl font-semibold">
                Unable to load applicants
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {error}
              </p>

              <p className="mt-4 text-xs text-gray-700">
                Job ID: {id}
              </p>

            </div>

          </div>

        </div>
      </Layout>
    );
  }

  // =================================================
  // MAIN UI
  // =================================================

  return (
    <Layout>

      <div className="relative min-h-screen overflow-hidden bg-[#050008] px-5 py-12 text-white sm:px-8 lg:px-12">

        {/* BACKGROUND GLOW */}

        <div className="pointer-events-none absolute left-[-200px] top-[200px] h-[400px] w-[400px] rounded-full bg-purple-700/15 blur-[130px]" />

        <div className="pointer-events-none absolute right-[-200px] top-[500px] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mb-12">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">

              <Sparkles className="h-3.5 w-3.5 text-[#c084fc]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c084fc]">
                Recruiter Dashboard
              </span>

            </div>

            <h1 className="text-4xl font-medium tracking-[-0.035em] sm:text-5xl">

              Job{" "}

              <span className="bg-gradient-to-r from-white via-[#d8b4fe] to-[#a855f7] bg-clip-text text-transparent">
                Applicants
              </span>

            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

              <Briefcase className="h-4 w-4 text-purple-400" />

              {job.title}

            </div>

          </div>

          {/* ================================================= */}
          {/* DIVIDER */}
          {/* ================================================= */}

          <div className="mb-10 flex items-center gap-5">

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-700">
              Candidate Applications
            </span>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          </div>

          {/* ================================================= */}
          {/* APPLICANTS */}
          {/* ================================================= */}

          {job.applications?.length > 0 ? (

            <div className="space-y-5">

              {job.applications.map((application) => (

                <div
                  key={application._id}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#110b18] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_15px_50px_rgba(168,85,247,0.12)]"
                >

                  {/* PURPLE GLOW */}

                  <div className="pointer-events-none absolute left-1/2 top-[30%] h-24 w-[60%] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[50px] transition duration-500 group-hover:bg-purple-500/30" />

                  <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-purple-500/70 to-transparent" />

                  <div className="relative z-10">

                    {/* TOP */}

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                      <div className="flex items-start gap-4">

                        {/* USER ICON */}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">

                          <User className="h-5 w-5 text-[#c084fc]" />

                        </div>

                        {/* USER DETAILS */}

                        <div>

                          <h2 className="text-xl font-medium tracking-tight text-white transition group-hover:text-[#d8b4fe]">

                            {application.applicant?.fullname ||
                              "Applicant"}

                          </h2>

                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                            <Mail className="h-3.5 w-3.5 text-purple-400" />

                            {application.applicant?.email ||
                              "Email not available"}

                          </div>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-[#c084fc]">

                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {application.status || "pending"}

                      </div>

                    </div>

                    {/* DIVIDER */}

                    <div className="my-6 h-px bg-white/[0.06]" />

                    {/* ACTIONS */}

                    <div className="flex flex-col gap-3 sm:flex-row">

                      {/* ACCEPT */}

                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            application._id,
                            "accepted"
                          )
                        }
                        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-5 text-sm font-medium text-green-400 transition hover:border-green-400/40 hover:bg-green-500/20"
                      >

                        <Check className="h-4 w-4" />

                        Accept

                      </button>

                      {/* REJECT */}

                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            application._id,
                            "rejected"
                          )
                        }
                        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition hover:border-red-400/40 hover:bg-red-500/20"
                      >

                        <X className="h-4 w-4" />

                        Reject

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0d0910] px-6 text-center">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">

                <User className="h-7 w-7 text-[#c084fc]" />

              </div>

              <h2 className="text-xl font-medium text-white">
                No applicants yet
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                No one has applied for this job yet.
              </p>

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default Applicants;