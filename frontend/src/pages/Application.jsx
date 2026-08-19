import { useEffect, useState } from "react";
import { Briefcase, MapPin, Clock, Sparkles } from "lucide-react";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";

function Application() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/application/get"
        );

        setApplications(response.data.applications || []);
      } catch (error) {
        console.log("Error getting applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    getAppliedJobs();
  }, []);

  // =================================================
  // STATUS STYLE
  // =================================================

  const getStatusStyle = (status) => {
    const currentStatus = status?.toLowerCase();

    if (currentStatus === "accepted") {
      return "border-green-500/20 bg-green-500/10 text-green-400";
    }

    if (currentStatus === "rejected") {
      return "border-red-500/20 bg-red-500/10 text-red-400";
    }

    return "border-purple-500/20 bg-purple-500/10 text-[#c084fc]";
  };

  return (
    <Layout>

      {/* ================================================= */}
      {/* MAIN PAGE */}
      {/* ================================================= */}

      <div className="relative min-h-screen overflow-hidden bg-[#050008] px-5 py-12 text-white sm:px-8 lg:px-12">

        {/* ================================================= */}
        {/* BACKGROUND GLOW */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute left-[-200px] top-[200px] h-[400px] w-[400px] rounded-full bg-purple-700/15 blur-[130px]" />

        <div className="pointer-events-none absolute right-[-200px] top-[500px] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[130px]" />

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mb-12">

            {/* BADGE */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">

              <Sparkles className="h-3.5 w-3.5 text-[#c084fc]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c084fc]">
                Career Journey
              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-4xl font-medium tracking-[-0.035em] sm:text-5xl">

              My{" "}

              <span className="bg-gradient-to-r from-white via-[#d8b4fe] to-[#a855f7] bg-clip-text text-transparent">
                Applications
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-4 text-sm font-normal leading-6 text-gray-500 sm:text-base">
              Jobs you have applied for. Track your
              application progress here.
            </p>

          </div>

          {/* ================================================= */}
          {/* DIVIDER */}
          {/* ================================================= */}

          <div className="mb-10 flex items-center gap-5">

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-700">
              Application History
            </span>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          </div>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading ? (

            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">

              <div className="text-center">

                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-purple-500/20 border-t-purple-400" />

                <p className="text-sm text-gray-600">
                  Loading applications...
                </p>

              </div>

            </div>

          ) : applications.length === 0 ? (

            /* ================================================= */
            /* EMPTY STATE */
            /* ================================================= */

            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0d0910] px-6 text-center">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 shadow-[0_0_25px_rgba(168,85,247,0.12)]">

                <Briefcase className="h-7 w-7 text-[#c084fc]" />

              </div>

              <h2 className="text-xl font-medium text-white">
                No applications yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                You haven't applied for any jobs yet.
                Explore available opportunities and
                start your career journey.
              </p>

            </div>

          ) : (

            /* ================================================= */
            /* APPLICATION CARDS */
            /* ================================================= */

            <div className="space-y-5">

              {applications.map((application) => (

                <div
                  key={application._id}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#110b18] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_15px_50px_rgba(168,85,247,0.12)]"
                >

                  {/* PURPLE GLOW */}

                  <div className="pointer-events-none absolute left-1/2 top-[30%] h-24 w-[60%] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[50px] transition duration-500 group-hover:bg-purple-500/30" />

                  {/* TOP PURPLE LINE */}

                  <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-purple-500/70 to-transparent" />

                  {/* CONTENT */}

                  <div className="relative z-10">

                    {/* TOP SECTION */}

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                      <div className="flex items-start gap-4">

                        {/* ICON */}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">

                          <Briefcase className="h-5 w-5 text-[#c084fc]" />

                        </div>

                        {/* JOB */}

                        <div>

                          <h2 className="text-xl font-medium tracking-tight text-white transition group-hover:text-[#d8b4fe]">
                            {application.job?.title}
                          </h2>

                          <p className="mt-1 text-sm text-[#b78bea]">
                            {application.job?.company?.name ||
                              "Company"}
                          </p>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                          application.status
                        )}`}
                      >

                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {application.status || "Pending"}

                      </div>

                    </div>

                    {/* DIVIDER */}

                    <div className="my-6 h-px bg-white/[0.06]" />

                    {/* JOB INFORMATION */}

                    <div className="grid gap-5 sm:grid-cols-2">

                      {/* LOCATION */}

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">

                          <MapPin className="h-4 w-4 text-purple-300" />

                        </div>

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.15em] text-gray-600">
                            Location
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            {application.job?.location ||
                              "Not specified"}
                          </p>

                        </div>

                      </div>

                      {/* JOB TYPE */}

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">

                          <Clock className="h-4 w-4 text-purple-300" />

                        </div>

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.15em] text-gray-600">
                            Job Type
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            {application.job?.jobType ||
                              "Not specified"}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default Application;