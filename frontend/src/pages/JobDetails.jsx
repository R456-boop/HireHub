import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // =================================================
  // GET JOB
  // =================================================

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/job/get/${id}`
        );

        setJob(response.data.job);
      } catch (error) {
        console.log("Error getting job:", error);
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [id]);

  // =================================================
  // LOADING
  // =================================================

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#050008] px-5 py-10 text-white">

          <div className="mx-auto max-w-7xl">

            <div className="rounded-[35px] border border-white/[0.08] bg-[#0d0b0f] p-20 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#b78bea]" />

              <p className="mt-5 text-sm text-gray-500">
                Loading job...
              </p>

            </div>

          </div>

        </div>
      </Layout>
    );
  }

  // =================================================
  // JOB NOT FOUND
  // =================================================

  if (!job) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center bg-[#050008] px-5 text-white">

          <div className="text-center">

            <span className="text-xs uppercase tracking-[0.3em] text-[#b78bea]">
              HireHub
            </span>

            <h1 className="mt-4 text-4xl font-medium">
              Job Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              Sorry, we couldn't find the job you're looking for.
            </p>

            <Link to="/jobs">
              <button className="mt-7 rounded-xl bg-[#b78bea] px-7 py-3 text-sm font-medium text-black transition hover:bg-[#c89ff5]">
                Back to Jobs
              </button>
            </Link>

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

      <div className="relative min-h-screen overflow-hidden bg-[#050008] px-4 py-8 text-white sm:px-7 lg:px-10">

        {/* ================================================= */}
        {/* BACKGROUND GLOW */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute left-[-180px] top-[100px] h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[150px]" />

        <div className="pointer-events-none absolute right-[-180px] top-[300px] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="pointer-events-none absolute bottom-[-200px] left-[35%] h-[400px] w-[400px] rounded-full bg-purple-900/20 blur-[130px]" />

        {/* ================================================= */}
        {/* MAIN CONTAINER */}
        {/* ================================================= */}

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* ================================================= */}
          {/* HERO SECTION */}
          {/* ================================================= */}

          <section className="relative min-h-[570px] overflow-hidden rounded-[35px] border border-white/[0.08] bg-[#09070d]">

            {/* LEFT PURPLE GLOW */}

            <div className="pointer-events-none absolute left-[-100px] top-[100px] h-[400px] w-[400px] rounded-full bg-purple-700/10 blur-[120px]" />

            {/* TOP LINE */}

            <div className="absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

            {/* ================================================= */}
            {/* LEFT CONTENT */}
            {/* ================================================= */}

            <div className="relative z-20 flex min-h-[570px] items-center px-7 py-14 sm:px-12 lg:w-[55%] lg:px-16">

              <div className="max-w-2xl">

                {/* SMALL LABEL */}

                <div className="mb-7 flex items-center gap-3">

                  <div className="h-px w-8 bg-[#b78bea]" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b78bea]">
                    Job Opportunity
                  </span>

                </div>

                {/* TITLE */}

                <h1 className="text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">

                  {job.title}

                </h1>

                {/* COMPANY */}

                <p className="mt-6 text-xl font-medium text-[#c084fc]">
                  {job.company?.name}
                </p>

                {/* DESCRIPTION */}

                <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
                  {job.description}
                </p>

                {/* APPLY */}

                <Link to={`/jobs/${id}/apply`}>

                  <Button
                    className="mt-9 h-12 rounded-xl bg-[#b78bea] px-8 text-sm font-medium text-black shadow-[0_0_30px_rgba(183,139,234,0.15)] transition hover:bg-[#c99ff5] hover:shadow-[0_0_40px_rgba(183,139,234,0.3)]"
                  >

                    Apply Now

                    <ArrowUpRight className="ml-2 h-4 w-4" />

                  </Button>

                </Link>

              </div>

            </div>

            {/* ================================================= */}
            {/* RIGHT SIDE PURPLE DESIGN */}
            {/* ================================================= */}

            <div className="absolute right-0 top-0 hidden h-full w-[48%] lg:block">

              {/* LARGE PURPLE GLOW */}

              <div className="absolute right-[-100px] top-[60px] h-[450px] w-[450px] rounded-full bg-purple-700/20 blur-[100px]" />

              {/* DIAGONAL PURPLE SHAPE */}

              <div className="absolute right-[-180px] top-[-100px] h-[600px] w-[500px] rotate-[20deg] rounded-[100px] bg-gradient-to-br from-purple-700/30 via-[#5b21b6]/20 to-transparent blur-[1px]" />

              {/* ================================================= */}
              {/* INFO CARD 1 */}
              {/* ================================================= */}

              <div className="absolute right-[10%] top-[17%] z-30 w-[310px] rotate-[-3deg] rounded-2xl border border-white/10 bg-[#21152c]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">

                    <MapPin className="h-5 w-5 text-[#c084fc]" />

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.18em] text-purple-300/60">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-white">
                      {job.location}
                    </p>

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* INFO CARD 2 */}
              {/* ================================================= */}

              <div className="absolute right-[5%] top-[37%] z-20 w-[340px] rotate-[2deg] rounded-2xl border border-purple-300/10 bg-[#35205b]/90 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-300/10">

                    <Briefcase className="h-5 w-5 text-purple-200" />

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.18em] text-purple-200/60">
                      Employment
                    </p>

                    <p className="mt-1 text-sm text-white">
                      {job.jobType}
                    </p>

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* INFO CARD 3 */}
              {/* ================================================= */}

              <div className="absolute right-[13%] top-[58%] z-10 w-[290px] rotate-[-2deg] rounded-2xl border border-white/10 bg-[#21152c]/95 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">

                    <IndianRupee className="h-5 w-5 text-[#c084fc]" />

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.18em] text-purple-300/60">
                      Salary
                    </p>

                    <p className="mt-1 text-sm text-white">
                      {job.salary} LPA
                    </p>

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* INFO CARD 4 */}
              {/* ================================================= */}

              <div className="absolute bottom-[10%] right-[25%] z-40 w-[230px] rotate-[3deg] rounded-2xl border border-white/10 bg-[#111111]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">

                <div className="flex items-center gap-3">

                  <Clock className="h-5 w-5 text-[#b78bea]" />

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.18em] text-gray-600">
                      Experience
                    </p>

                    <p className="mt-1 text-sm text-gray-200">
                      {job.experienceneed}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ================================================= */}
          {/* MOBILE JOB INFORMATION */}
          {/* ================================================= */}

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:hidden">

            <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5">

              <MapPin className="h-5 w-5 text-[#b78bea]" />

              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-600">
                Location
              </p>

              <p className="mt-1 text-sm text-gray-300">
                {job.location}
              </p>

            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5">

              <Briefcase className="h-5 w-5 text-[#b78bea]" />

              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-600">
                Employment
              </p>

              <p className="mt-1 text-sm text-gray-300">
                {job.jobType}
              </p>

            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5">

              <IndianRupee className="h-5 w-5 text-[#b78bea]" />

              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-600">
                Salary
              </p>

              <p className="mt-1 text-sm text-gray-300">
                {job.salary} LPA
              </p>

            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5">

              <Clock className="h-5 w-5 text-[#b78bea]" />

              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-600">
                Experience
              </p>

              <p className="mt-1 text-sm text-gray-300">
                {job.experienceneed}
              </p>

            </div>

          </div>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <section className="relative mt-7 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0d0b0f] p-7 sm:p-10">

            {/* PURPLE GLOW */}

            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[#b78bea] to-fuchsia-500" />

                <div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#b78bea]">
                    About the role
                  </p>

                  <h2 className="mt-1 text-2xl font-medium text-white">
                    Job Description
                  </h2>

                </div>

              </div>

              <p className="mt-7 max-w-5xl text-sm leading-8 text-gray-500 sm:text-base">
                {job.description}
              </p>

            </div>

          </section>

          {/* ================================================= */}
          {/* REQUIREMENTS */}
          {/* ================================================= */}

          <section className="relative mt-7 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0d0b0f] p-7 sm:p-10">

            <div className="pointer-events-none absolute left-[-100px] bottom-[-100px] h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[#b78bea] to-fuchsia-500" />

                <div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#b78bea]">
                    What we're looking for
                  </p>

                  <h2 className="mt-1 text-2xl font-medium text-white">
                    Requirements
                  </h2>

                </div>

              </div>

              <ul className="mt-8 space-y-5">

                {job.requirements?.map(
                  (requirement, index) => (

                    <li
                      key={index}
                      className="flex items-start gap-4 text-sm leading-7 text-gray-400 sm:text-base"
                    >

                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#b78bea] shadow-[0_0_12px_rgba(183,139,234,0.5)]" />

                      <span>
                        {requirement}
                      </span>

                    </li>

                  )
                )}

              </ul>

            </div>

          </section>

          {/* ================================================= */}
          {/* FINAL CTA */}
          {/* ================================================= */}

          <section className="relative mt-7 overflow-hidden rounded-[30px] border border-purple-500/20 bg-gradient-to-r from-[#12091a] via-[#1a0d28] to-[#0c0810] px-7 py-10 sm:px-10">

            <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full bg-purple-600/20 blur-[110px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">

              <div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b78bea]">
                  Next step
                </p>

                <h2 className="mt-2 text-2xl font-medium text-white sm:text-3xl">
                  Ready to apply?
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Take the next step toward your career.
                </p>

              </div>

              <Link to={`/jobs/${id}/apply`}>

                <button className="flex items-center gap-2 rounded-xl bg-[#b78bea] px-7 py-3.5 text-sm font-medium text-black transition hover:bg-[#c99ff5] hover:shadow-[0_0_30px_rgba(183,139,234,0.25)]">

                  Apply for this Job

                  <ArrowUpRight className="h-4 w-4" />

                </button>

              </Link>

            </div>

          </section>

        </div>

      </div>

    </Layout>
  );
}

export default JobDetails;