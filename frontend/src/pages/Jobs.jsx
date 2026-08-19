import { useEffect, useState } from "react";
import {
  Search,
  Briefcase,
  MapPin,
  Sparkles,
} from "lucide-react";

import Layout from "../components/Layout";
import JobCard from "../components/JobCard";
import axiosInstance from "../utils/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  // =========================================
  // GET JOBS
  // =========================================

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/job/get"
        );

        setJobs(response.data.jobs || []);
      } catch (error) {
        console.log("Error getting jobs:", error);
      }
    };

    getJobs();
  }, []);

  // =========================================
  // FILTER JOBS
  // =========================================

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      job.title
        ?.toLowerCase()
        .includes(searchText) ||
      job.company?.name
        ?.toLowerCase()
        .includes(searchText);

    const matchesLocation =
      !location ||
      job.location
        ?.toLowerCase()
        .includes(location.toLowerCase());

    const matchesJobType =
      !jobType ||
      job.jobType?.toLowerCase() ===
        jobType.toLowerCase();

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType
    );
  });

  return (
    <Layout>

      {/* ================================================= */}
      {/* MAIN JOBS PAGE */}
      {/* ================================================= */}

      <div className="relative min-h-screen overflow-hidden bg-[#050008] text-white">

        {/* ================================================= */}
        {/* BACKGROUND GLOW */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute left-[-250px] top-[180px] h-[450px] w-[450px] rounded-full bg-purple-700/20 blur-[130px]" />

        <div className="pointer-events-none absolute right-[-250px] top-[400px] h-[450px] w-[450px] rounded-full bg-fuchsia-600/10 blur-[130px]" />

        <div className="pointer-events-none absolute left-1/2 top-[100px] h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[120px]" />

        {/* ================================================= */}
        {/* MAIN CONTAINER */}
        {/* ================================================= */}

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="max-w-3xl">

            {/* SMALL BADGE */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">

              <Sparkles className="h-3.5 w-3.5 text-[#c084fc]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c084fc]">
                Career Opportunities
              </span>

            </div>

            {/* HEADING */}

            <h1 className="text-4xl font-medium leading-tight tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">

              Find the right{" "}

              <span className="bg-gradient-to-r from-[#ffffff] via-[#d8b4fe] to-[#a855f7] bg-clip-text text-transparent">
                opportunity.
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-5 max-w-2xl text-sm font-normal leading-7 text-gray-500 sm:text-base">
              Explore jobs from growing startups, technology
              companies, and ambitious teams looking for talented
              people.
            </p>

          </div>

          {/* ================================================= */}
          {/* SEARCH AREA */}
          {/* ================================================= */}

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-md">

            <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_auto]">

              {/* ================= SEARCH ================= */}

              <div className="relative">

                <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

                <input
                  type="text"
                  placeholder="Search jobs by title or keyword..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="h-14 w-full rounded-xl border border-white/[0.07] bg-[#0d0a10] pl-12 pr-5 text-sm font-normal text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60"
                />

              </div>


             

              {/* ================= SEARCH BUTTON ================= */}

              <button
                type="button"
                className="flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#c084fc] px-7 text-sm font-medium text-black shadow-[0_0_25px_rgba(168,85,247,0.2)] transition hover:scale-[1.01] hover:from-[#9333ea] hover:to-[#b06cf5]"
              >

                <Search className="h-4 w-4" />

                Search

              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* FEATURE STRIP */}
          {/* ================================================= */}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {/* FEATURE 1 */}

            <div className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-purple-500/30">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">

                  <Briefcase className="h-5 w-5 text-[#c084fc]" />

                </div>

                <div>

                  <p className="text-xs font-medium text-white">
                    Quality Jobs
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Curated opportunities
                  </p>

                </div>

              </div>

            </div>

            {/* FEATURE 2 */}

            <div className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-purple-500/30">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">

                  <Sparkles className="h-5 w-5 text-[#c084fc]" />

                </div>

                <div>

                  <p className="text-xs font-medium text-white">
                    Growing Teams
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Find your next team
                  </p>

                </div>

              </div>

            </div>

            {/* FEATURE 3 */}

            <div className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-purple-500/30">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">

                  <MapPin className="h-5 w-5 text-[#c084fc]" />

                </div>

                <div>

                  <p className="text-xs font-medium text-white">
                    Multiple Locations
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Remote & onsite
                  </p>

                </div>

              </div>

            </div>

            {/* FEATURE 4 */}

            <div className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-purple-500/30">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">

                  <span className="text-lg text-[#c084fc]">
                    ⚡
                  </span>

                </div>

                <div>

                  <p className="text-xs font-medium text-white">
                    Fast Hiring
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Connect with recruiters
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* DIVIDER */}
          {/* ================================================= */}

          <div className="my-14 flex items-center gap-5">

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-700">
              Latest opportunities
            </span>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          </div>

          {/* ================================================= */}
          {/* JOBS HEADER */}
          {/* ================================================= */}

          <div className="mb-8 flex items-end justify-between">

            <div>

              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#b78bea]">
                Opportunities
              </p>

              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Latest Jobs
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Explore the latest roles available on HireHub.
              </p>

            </div>

            <span className="hidden text-sm text-gray-600 sm:block">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1
                ? "opportunity"
                : "opportunities"}
            </span>

          </div>

          {/* ================================================= */}
          {/* JOB CARDS */}
          {/* ================================================= */}

          {filteredJobs.length === 0 ? (

            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-center">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">

                <Briefcase className="h-7 w-7 text-[#b78bea]" />

              </div>

              <h3 className="text-lg font-medium text-white">
                No jobs found
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Try searching for a different job, location,
                or company.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {filteredJobs.map((job) => (

                <div
                  key={job._id}
                  className="rounded-2xl border border-white/[0.07] bg-[#111016] p-1 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_15px_50px_rgba(139,92,246,0.12)]"
                >

                  <JobCard
                    id={job._id}
                    title={job.title}
                    company={job.company?.name}
                    location={job.location}
                    jobType={job.jobType}
                    salary={job.salary}
                  />

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default Jobs;