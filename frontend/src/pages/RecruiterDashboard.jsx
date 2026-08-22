import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";

import {
  Briefcase,
  MapPin,
  Users,
  Plus,
  ArrowUpRight,
  Sparkles,
  Building2,
  Clock,
} from "lucide-react";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  // =====================================================
  // GET RECRUITER JOBS
  // =====================================================

  useEffect(() => {
    const getRecruiterJobs = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/job/recruiter"
        );

        setJobs(response.data.jobs);
      } catch (error) {
        console.log("Error getting recruiter jobs:", error);
      }
    };

    getRecruiterJobs();
  }, []);

  return (
    <Layout>

      {/* ================================================= */}
      {/* MAIN PAGE */}
      {/* ================================================= */}

      <div className="min-h-screen overflow-hidden bg-[#05020b] text-white">

        {/* ================================================= */}
        {/* BACKGROUND GLOW */}
        {/* ================================================= */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-700/10 blur-[140px]" />

          <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[150px]" />

          <div className="absolute left-1/2 top-[700px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />

        </div>


        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">


          {/* ================================================= */}
          {/* HERO */}
          {/* ================================================= */}

          <section className="relative overflow-hidden rounded-[32px] border border-purple-500/20 bg-gradient-to-br from-[#13091d] via-[#0b0611] to-[#16091e] px-7 py-10 shadow-[0_0_80px_rgba(109,40,217,0.08)] sm:px-10 sm:py-14">

            {/* HERO GLOW */}

            <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[100px]" />


            <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">


              {/* ================================================= */}
              {/* HERO LEFT */}
              {/* ================================================= */}

              <div>

                {/* LABEL */}

                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-300">

                  <Sparkles className="h-4 w-4" />

                  Recruiter Platform

                </div>


                {/* HEADING */}

                <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

                  Build your team.

                  <br />

                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">

                    Hire smarter.

                  </span>

                </h1>


                {/* DESCRIPTION */}

                <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">

                  Manage your job opportunities, connect with talented
                  candidates and build the team your company needs.

                </p>


                {/* BUTTONS */}

                <div className="mt-9 flex flex-wrap gap-4">

                  <Link to="/recruiter/post-job">

                    <Button
                      className="h-12 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.2)] transition hover:scale-[1.02] hover:from-purple-400 hover:to-fuchsia-400"
                    >

                      <Plus className="mr-2 h-5 w-5" />

                      Post a Job

                    </Button>

                  </Link>


                  <Link to="/jobs">

                    <Button
                      variant="outline"
                      className="h-12 rounded-xl border-white/10 bg-white/[0.03] px-6 font-semibold text-gray-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
                    >

                      Explore Jobs

                      <ArrowUpRight className="ml-2 h-4 w-4" />

                    </Button>

                  </Link>

                </div>

              </div>


              {/* ================================================= */}
              {/* HERO RIGHT - FUTURISTIC VISUAL */}
              {/* ================================================= */}

              <div className="relative hidden h-[330px] lg:block">

                {/* BIG GLOW */}

                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[90px]" />


                {/* OUTER CIRCLE */}

                <div className="absolute left-1/2 top-1/2 flex h-64 w-64 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-purple-400/20 bg-purple-500/[0.03]">

                  <div className="flex h-48 w-48 items-center justify-center rounded-full border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 shadow-[0_0_70px_rgba(168,85,247,0.25)]">

                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-purple-500/10">

                      <Users className="h-16 w-16 text-purple-300" />

                    </div>

                  </div>

                </div>


                {/* FLOATING CARD */}

                <div className="absolute left-0 top-8 rounded-2xl border border-white/10 bg-[#120d1d]/90 px-5 py-4 shadow-xl backdrop-blur">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">

                    Jobs Posted

                  </p>

                  <p className="mt-1 text-3xl font-black text-purple-300">

                    {jobs.length}

                  </p>

                </div>


                {/* FLOATING CARD */}

                <div className="absolute right-0 top-24 rounded-2xl border border-white/10 bg-[#120d1d]/90 px-5 py-4 shadow-xl backdrop-blur">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">

                    Hiring Status

                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm font-bold text-green-400">

                    <span className="h-2 w-2 rounded-full bg-green-400" />

                    Active

                  </p>

                </div>


                {/* FLOATING CARD */}

                <div className="absolute bottom-2 left-12 rounded-2xl border border-white/10 bg-[#120d1d]/90 px-5 py-4 shadow-xl backdrop-blur">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-purple-500/10 p-2.5">

                      <Briefcase className="h-5 w-5 text-purple-400" />

                    </div>

                    <div>

                      <p className="text-sm font-bold">

                        Smart Hiring

                      </p>

                      <p className="text-xs text-gray-500">

                        Build better teams

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


            {/* JOBS */}

            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-purple-500/[0.04]">

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-purple-500/10 p-3">

                  <Briefcase className="h-6 w-6 text-purple-400" />

                </div>

                <ArrowUpRight className="h-5 w-5 text-gray-700 group-hover:text-purple-400" />

              </div>

              <p className="mt-5 text-sm text-gray-500">

                Jobs Posted

              </p>

              <p className="mt-1 text-3xl font-black">

                {jobs.length}

              </p>

            </div>


           


            {/* RECRUITER */}

            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30">

              <div className="rounded-xl bg-purple-500/10 p-3 w-fit">

                <Building2 className="h-6 w-6 text-purple-400" />

              </div>

              <p className="mt-5 text-sm text-gray-500">

                Recruiter

              </p>

              <p className="mt-1 text-xl font-bold">

                Active

              </p>

            </div>


            {/* STATUS */}

            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30">

              <div className="rounded-xl bg-green-500/10 p-3 w-fit">

                <Clock className="h-6 w-6 text-green-400" />

              </div>

              <p className="mt-5 text-sm text-gray-500">

                Hiring Status

              </p>

              <p className="mt-1 flex items-center gap-2 text-xl font-bold text-green-400">

                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                Active

              </p>

            </div>

          </section>


          {/* ================================================= */}
          {/* POST JOB BANNER */}
          {/* ================================================= */}

          <section className="mt-8">

            <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-[#11091b] to-fuchsia-950/30 p-8 sm:p-10">

              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[90px]" />

              <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-center">

                <div>

                  <div className="mb-3 flex items-center gap-2 text-purple-400">

                    <Sparkles className="h-5 w-5" />

                    <span className="text-xs font-bold uppercase tracking-[0.2em]">

                      Start Hiring

                    </span>

                  </div>

                  <h2 className="text-3xl font-black">

                    Find your next great hire.

                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">

                    Create a new opportunity and connect with talented
                    candidates.

                  </p>

                </div>


                <Link to="/recruiter/post-job">

                  <Button
                    className="h-12 shrink-0 rounded-xl bg-purple-500 px-6 font-bold text-white hover:bg-purple-400"
                  >

                    Post New Job

                    <ArrowUpRight className="ml-2 h-5 w-5" />

                  </Button>

                </Link>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* MY JOBS */}
          {/* ================================================= */}

          <section className="mt-16 pb-16">

            <div className="mb-8 flex items-end justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">

                  Opportunities

                </p>

                <h2 className="mt-2 text-3xl font-black">

                  My Jobs

                </h2>

              </div>

              <span className="text-sm text-gray-600">

                {jobs.length} opportunities

              </span>

            </div>


            {/* ================================================= */}
            {/* NO JOBS */}
            {/* ================================================= */}

            {jobs.length === 0 ? (

              <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6 py-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10">

                  <Briefcase className="h-8 w-8 text-purple-400" />

                </div>

                <h3 className="mt-5 text-xl font-bold">

                  No jobs posted yet

                </h3>

                <p className="mt-2 text-sm text-gray-500">

                  Create your first job opportunity to start hiring.

                </p>

                <Link to="/recruiter/post-job">

                  <Button className="mt-6 rounded-xl bg-purple-500 px-6 font-bold hover:bg-purple-400">

                    <Plus className="mr-2 h-4 w-4" />

                    Post Your First Job

                  </Button>

                </Link>

              </div>

            ) : (

              /* ================================================= */
              /* JOB CARDS */
              /* ================================================= */

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                {jobs.map((job) => (

                  <div
                    key={job._id}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0d0814] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_20px_60px_rgba(109,40,217,0.15)]"
                  >

                    {/* CARD GLOW */}

                    <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-purple-600/10 blur-[70px] transition group-hover:bg-purple-600/20" />


                    <div className="relative">

                      {/* TOP */}

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">

                            <Briefcase className="h-5 w-5 text-purple-400" />

                          </div>

                          <h3 className="text-xl font-black">

                            {job.title}

                          </h3>

                          <p className="mt-1 text-sm font-medium text-purple-400">

                            {job.company?.name}

                          </p>

                        </div>


                        <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">

                          Active

                        </span>

                      </div>


                      {/* DETAILS */}

                      <div className="mt-7 space-y-3 text-sm text-gray-400">

                        <div className="flex items-center gap-3">

                          <MapPin className="h-4 w-4 shrink-0 text-purple-400" />

                          <span>{job.location}</span>

                        </div>


                        <div className="flex items-center gap-3">

                          <Briefcase className="h-4 w-4 shrink-0 text-purple-400" />

                          <span>{job.jobType}</span>

                        </div>


                        <div className="flex items-center gap-3">

                          <span className="text-base text-purple-400">

                            ₹

                          </span>

                          <span>{job.salary} LPA</span>

                        </div>


                        <div className="flex items-center gap-3">

                          <Users className="h-4 w-4 shrink-0 text-purple-400" />

                          <span>

                            {job.position} position(s)

                          </span>

                        </div>

                      </div>


                      {/* BUTTON */}

                      <Link
                        to={`/recruiter/applicants/${job._id}`}
                      >

                        <Button
                          className="mt-7 h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] font-semibold text-gray-300 shadow-none transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                        >

                          View Applicants

                          <ArrowUpRight className="ml-2 h-4 w-4" />

                        </Button>

                      </Link>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        </div>

      </div>

    </Layout>
  );
}

export default RecruiterDashboard;