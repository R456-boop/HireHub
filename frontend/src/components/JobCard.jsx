import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";

function JobCard({
  id,
  title,
  company,
  location,
  jobType,
  salary,
}) {
  return (
    <Link to={`/jobs/${id}`} className="block">

      {/* ================================================= */}
      {/* JOB CARD */}
      {/* ================================================= */}

      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#110b18] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_15px_50px_rgba(168,85,247,0.15)]">

        {/* ================================================= */}
        {/* PURPLE GLOW */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute left-1/2 top-[35%] h-24 w-[75%] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[45px] transition duration-500 group-hover:bg-purple-500/35" />

        {/* ================================================= */}
        {/* TOP PURPLE LIGHT */}
        {/* ================================================= */}

        <div className="absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent via-[#b45cff] to-transparent opacity-70" />

        {/* ================================================= */}
        {/* TOP ROW */}
        {/* ================================================= */}

        <div className="relative z-10 flex items-start justify-between">

          {/* ICON */}

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.1)]">

            <Briefcase className="h-5 w-5 text-[#c084fc]" />

          </div>

          {/* ARROW */}

          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-gray-600 transition duration-300 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 group-hover:text-purple-300">

            <ArrowUpRight className="h-4 w-4" />

          </div>

        </div>

        {/* ================================================= */}
        {/* JOB TITLE */}
        {/* ================================================= */}

        <div className="relative z-10 mt-6">

          <h2 className="line-clamp-2 text-xl font-medium tracking-tight text-white transition duration-300 group-hover:text-[#d8b4fe]">
            {title}
          </h2>

          <p className="mt-2 text-sm font-normal text-[#b78bea]">
            {company}
          </p>

        </div>

        {/* ================================================= */}
        {/* PURPLE DIVIDER */}
        {/* ================================================= */}

        <div className="relative z-10 my-6 h-px bg-white/[0.06]">

          <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-purple-500/70 to-transparent shadow-[0_0_12px_rgba(168,85,247,0.5)]" />

        </div>

        {/* ================================================= */}
        {/* JOB INFORMATION */}
        {/* ================================================= */}

        <div className="relative z-10 space-y-3">

          {/* LOCATION */}

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">

              <MapPin className="h-4 w-4 text-purple-300" />

            </div>

            <div className="min-w-0">

              <p className="text-[9px] uppercase tracking-[0.15em] text-gray-600">
                Location
              </p>

              <p className="mt-0.5 truncate text-sm font-normal text-gray-400">
                {location}
              </p>

            </div>

          </div>

          {/* JOB TYPE */}

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">

              <Briefcase className="h-4 w-4 text-purple-300" />

            </div>

            <div>

              <p className="text-[9px] uppercase tracking-[0.15em] text-gray-600">
                Job Type
              </p>

              <p className="mt-0.5 text-sm font-normal text-gray-400">
                {jobType}
              </p>

            </div>

          </div>

          {/* SALARY */}

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">

              <IndianRupee className="h-4 w-4 text-purple-300" />

            </div>

            <div>

              <p className="text-[9px] uppercase tracking-[0.15em] text-gray-600">
                Salary
              </p>

              <p className="mt-0.5 text-sm font-normal text-gray-400">
                {salary} LPA
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* VIEW JOB */}
        {/* ================================================= */}

        <div className="relative z-10 mt-7 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9333ea] to-[#b56cff] text-sm font-medium text-white shadow-[0_0_20px_rgba(168,85,247,0.15)] transition duration-300 group-hover:from-[#a855f7] group-hover:to-[#c084fc] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">

          View Job Details

          <ArrowUpRight className="h-4 w-4" />

        </div>

      </div>

    </Link>
  );
}

export default JobCard;