import { useEffect, useState } from "react";
import { Search, Heart, Bookmark } from "lucide-react";

import Layout from "../components/Layout";
import JobCard from "../components/JobCard";
import axiosInstance from "../utils/axios";

import Toast from "@/components/Toast";
import { useToast } from "@/hooks/useToast";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const { toast, showToast, hideToast } = useToast();

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

        showToast(
          error.response?.data?.message ||
            "Failed to load jobs.",
          "error"
        );
      }
    };

    getJobs();
  }, []);

  // =========================================
  // FILTER JOBS
  // =========================================

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    return (
      job.title
        ?.toLowerCase()
        .includes(searchText) ||
      job.location
        ?.toLowerCase()
        .includes(searchText) ||
      job.company?.name
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <Layout>

      {/* ================================================= */}
      {/* HOME PAGE */}
      {/* ================================================= */}

      <div className="min-h-screen overflow-hidden bg-[#050008] text-white">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative flex min-h-[650px] items-center justify-center overflow-hidden px-5 py-20">

          {/* ================================================= */}
          {/* LEFT PURPLE GLOW */}
          {/* ================================================= */}

          <div className="pointer-events-none absolute -left-48 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rotate-45 bg-[#7c32ff]/20 blur-[90px]" />

          <div className="pointer-events-none absolute -left-64 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rotate-45 rounded-[60px] border border-[#8b3dff]/40 bg-[#7c32ff]/10 shadow-[0_0_100px_40px_rgba(139,61,255,0.35)]" />

          {/* ================================================= */}
          {/* RIGHT PURPLE GLOW */}
          {/* ================================================= */}

          <div className="pointer-events-none absolute -right-48 top-1/2 h-[500px] w-[500px] -translate-y-1/2 -rotate-45 bg-[#7c32ff]/20 blur-[90px]" />

          <div className="pointer-events-none absolute -right-64 top-1/2 h-[260px] w-[260px] -translate-y-1/2 -rotate-45 rounded-[60px] border border-[#8b3dff]/40 bg-[#7c32ff]/10 shadow-[0_0_100px_40px_rgba(139,61,255,0.35)]" />

          {/* ================================================= */}
          {/* TOP PURPLE GLOW */}
          {/* ================================================= */}

          <div className="pointer-events-none absolute left-1/2 top-20 h-20 w-20 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

          {/* ================================================= */}
          {/* HERO CONTENT */}
          {/* ================================================= */}

          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">

            {/* ================= SMALL BADGE ================= */}

            <div className="mb-7 flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-[#c66cff]" />

              <span className="text-[11px] font-medium tracking-wide text-purple-200">
                Find your next opportunity
              </span>

            </div>

            {/* ================= MAIN HEADING ================= */}

            <h1 className="max-w-3xl text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">

              Your Career.
              <br />

              <span className="bg-gradient-to-r from-white via-[#d9b5ff] to-[#a855f7] bg-clip-text text-transparent">
                Your Future.
              </span>

            </h1>

            {/* ================= SUBTITLE ================= */}

            <p className="mt-6 max-w-xl text-sm font-normal leading-6 text-gray-400 sm:text-base">
              Discover exciting opportunities, connect with
              companies, and find the perfect job to build
              your career.
            </p>

            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <div className="mt-9 flex w-full max-w-2xl gap-2">

              {/* ================= SEARCH INPUT ================= */}

              <div className="relative flex-1">

                <Search
                  className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  placeholder="Search your dream job..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-5 text-sm text-white outline-none backdrop-blur-md transition placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-white/[0.08]"
                />

              </div>

              {/* ================= FIND BUTTON ================= */}

              <button
                type="button"
                className="flex h-12 w-28 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#a855f7] text-sm font-medium text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] transition hover:bg-[#9333ea]"
              >

                <Search className="h-4 w-4" />

                FIND

              </button>

            </div>

            {/* ================================================= */}
            {/* TRUST SECTION */}
            {/* ================================================= */}

            <div className="mt-7 flex items-center gap-3">

              {/* AVATARS */}

              <div className="flex -space-x-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#050008] bg-[#c084fc] text-[9px] font-bold">
                  A
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#050008] bg-[#818cf8] text-[9px] font-bold">
                  R
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#050008] bg-[#f0abfc] text-[9px] font-bold">
                  S
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#050008] bg-[#67e8f9] text-[9px] font-bold">
                  K
                </div>

              </div>

              <p className="text-xs text-gray-500">
                Join thousands of job seekers finding
                their next opportunity.
              </p>

            </div>

          </div>

        </section>

       
        {/* ================================================= */}
        {/* LATEST JOBS */}
        {/* ================================================= */}

        <section className="border-t border-white/[0.05] bg-[#08050b] px-5 py-16 sm:px-8 lg:px-16">

          <div className="mx-auto max-w-7xl">

            {/* ================= HEADING ================= */}

            <div className="mb-9 flex items-end justify-between">

              <div>

                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#b78bea]">
                  Opportunities
                </p>

                <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Latest Jobs
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Explore the latest opportunities
                  available on HireHub.
                </p>

              </div>

              <span className="hidden text-sm text-gray-600 sm:block">
                {filteredJobs.length} opportunities
              </span>

            </div>

            {/* ================================================= */}
            {/* JOBS */}
            {/* ================================================= */}

            {filteredJobs.length === 0 ? (

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-14 text-center">

                <Search className="mx-auto mb-4 h-8 w-8 text-gray-700" />

                <h3 className="text-lg font-medium text-white">
                  No jobs found
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Try searching for a different job,
                  location, or company.
                </p>

              </div>

            ) : (

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {filteredJobs.map((job) => (

                  <div
                    key={job._id}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-1 transition duration-300 hover:border-[#b78bea]/50 hover:shadow-[0_0_35px_rgba(183,139,234,0.08)]"
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

        </section>
         {/* ================================================= */}
        {/* TRUSTED DIVIDER */}
        {/* ================================================= */}

        <div className="mx-auto flex max-w-5xl items-center gap-5 px-6">

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

          <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-gray-600">
            Trusted by ambitious professionals
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        </div>

        {/* ================================================= */}
        {/* SIMPLE TRUST TEXT */}
        {/* ================================================= */}

        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-4 px-6 pb-16 pt-8 text-xs font-medium tracking-wider text-gray-700">

          <span>STARTUPS</span>
          <span>TECH COMPANIES</span>
          <span>CREATIVE TEAMS</span>
          <span>GLOBAL COMPANIES</span>
          <span>FAST GROWING TEAMS</span>

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

    </Layout>
  );
}

export default Home;