import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  ChevronDown,
  ArrowDown,
  Menu,
  Heart,
  Bookmark,
} from "lucide-react";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import JobCard from "../components/JobCard";
import axiosInstance from "../utils/axios";

function Home() {
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [message, setMessage] = useState(
    location.state?.message || ""
  );

  // ==========================================
  // GET JOBS
  // ==========================================

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/job/get"
        );

        console.log("Jobs response:", response.data);

        setJobs(response.data.jobs || []);
      } catch (error) {
        console.log("Error getting jobs:", error);
      }
    };

    getJobs();
  }, []);

  // ==========================================
  // WELCOME MESSAGE
  // ==========================================

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      job.title?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText) ||
      job.company?.name?.toLowerCase().includes(searchText)
    );
  });

  return (
    <Layout>

      {/* ========================================= */}
      {/* WELCOME MESSAGE */}
      {/* ========================================= */}

      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">

          <h1 className="px-4 text-center text-4xl font-bold sm:text-6xl">
            {message}
          </h1>

        </div>
      )}


      {/* ========================================= */}
      {/* ENTIRE HOME PAGE */}
      {/* ========================================= */}

      <div className="min-h-screen bg-[#111111]">


        {/* ========================================= */}
        {/* PURPLE OUTER BACKGROUND */}
        {/* ========================================= */}

        <div className="bg-[#b78bea] px-3 py-3 sm:px-5 sm:py-5 lg:px-8">


          {/* ========================================= */}
          {/* ONE BIG BLACK CONTAINER */}
          {/* ========================================= */}

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#111111] text-white">


            {/* ========================================= */}
            {/* NAVBAR */}
            {/* ========================================= */}

<nav className="flex items-center justify-between bg-[#111111] px-6 py-5 sm:px-10 lg:px-14">


             


          


            

              

            </nav>


            {/* ========================================= */}
            {/* HERO SECTION */}
            {/* ========================================= */}

            <section className="px-6 pb-16 pt-16 sm:px-10 lg:px-14 lg:pb-20 lg:pt-20">


              <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">


                {/* ===================================== */}
                {/* LEFT SIDE */}
                {/* ===================================== */}

                <div>


                  {/* SMALL LABEL */}

                  <div className="mb-7 flex items-center gap-3">

                    <span className="rounded-full bg-[#dfff65] px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-black">

                      Get Started

                    </span>

                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500">

                      To looking dream job

                    </span>

                  </div>


                  {/* MAIN HEADING */}

                  <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">

                    Find Your

                    <br />

                    <span className="text-[#b78bea]">
                      Dream
                    </span>

                    {" "}Job

                    <br />

                    Easily

                  </h1>


                  {/* DESCRIPTION */}

                  <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">

                    Discover exciting opportunities and find
                    the perfect position to build your career.

                  </p>


                  {/* ===================================== */}
                  {/* SEARCH AREA */}
                  {/* ===================================== */}

                  <div className="mt-9 flex max-w-2xl gap-2">


                    {/* SEARCH INPUTS */}

                    <div className="flex-1">


                      {/* KEYWORD */}

                      <div className="relative">

                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#dfff65]" />

                        <Input
                          type="text"
                          placeholder="Keyword"
                          value={search}
                          onChange={(e) =>
                            setSearch(e.target.value)
                          }
                          className="h-12 rounded-xl border-[#303030] bg-[#242424] pl-11 text-white placeholder:text-gray-500 focus:border-[#dfff65] focus:ring-0"
                        />

                      </div>


                      {/* LOCATION */}

                      <button
                        type="button"
                        className="mt-2 flex h-12 w-full items-center justify-between rounded-xl border border-[#303030] bg-[#242424] px-4 text-sm text-gray-400"
                      >

                        <span className="flex items-center gap-3">

                          <MapPin className="h-4 w-4 text-[#dfff65]" />

                          Location

                        </span>

                        <ChevronDown className="h-4 w-4" />

                      </button>


                      {/* SPECIALITY */}

                      <button
                        type="button"
                        className="mt-2 flex h-12 w-full items-center justify-between rounded-xl border border-[#303030] bg-[#242424] px-4 text-sm text-gray-400"
                      >

                        <span className="flex items-center gap-3">

                          <BriefcaseBusiness className="h-4 w-4 text-[#dfff65]" />

                          Speciality

                        </span>

                        <ChevronDown className="h-4 w-4" />

                      </button>

                    </div>


                    {/* FIND BUTTON */}

                    <button
                      type="button"
                      className="w-24 rounded-xl bg-[#dfff65] text-sm font-black text-black transition hover:scale-105"
                    >

                      FIND

                    </button>

                  </div>


                  {/* ===================================== */}
                  {/* SCROLL INDICATOR */}
                  {/* ===================================== */}

                  <div className="mt-10 flex items-center gap-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#292929]">

                      <ArrowDown className="h-5 w-5" />

                    </div>

                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500">

                      Swipe to see more

                    </span>

                  </div>

                </div>


                {/* ===================================== */}
                {/* RIGHT SIDE JOB CARD */}
                {/* ===================================== */}

                <div className="relative flex min-h-[450px] items-center justify-center">


                  {/* YELLOW BACK CARD */}

                  <div className="absolute h-[350px] w-[290px] rotate-[8deg] rounded-[45px] bg-[#dfff65] sm:h-[390px] sm:w-[340px]" />


                  {/* PURPLE BACK CARD */}

                  <div className="absolute h-[350px] w-[290px] -rotate-[5deg] rounded-[45px] bg-[#8e67d8] sm:h-[390px] sm:w-[340px]" />


                  {/* MAIN JOB CARD */}

                  <div className="relative z-10 w-[290px] rounded-[42px] border-4 border-[#b78bea] bg-[#d9e0e1] p-4 text-black sm:w-[340px]">


                    {/* JOB TITLE */}

                    <div className="rounded-[30px] bg-[#dce4e5] px-5 py-8">

                      <h2 className="text-center text-2xl font-black sm:text-3xl">

                        Product Designer

                      </h2>

                    </div>


                    {/* COMPANY + TYPE */}

                    <div className="mt-3 flex gap-2">

                      <div className="flex flex-1 items-center justify-center rounded-full bg-white px-3 py-3 text-xs font-bold">

                        Apple Inc

                      </div>

                      <div className="rounded-full bg-white px-4 py-3 text-xs font-bold">

                        Fulltime

                      </div>

                    </div>


                    {/* APPLICANTS */}

                    <div className="mt-3 flex items-center justify-between rounded-full bg-white px-4 py-3">


                      <div className="flex -space-x-2">

                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#b78bea]" />

                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#e5b87a]" />

                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#7894ad]" />

                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#d28b8b]" />

                      </div>


                      <div className="flex items-center gap-1 text-sm font-bold">

                        <Heart className="h-4 w-4 fill-red-400 text-red-400" />

                        120

                      </div>


                      <span className="text-xs font-bold">

                        10k Applicants

                      </span>

                    </div>


                    {/* BUTTONS */}

                    <div className="mt-4 flex gap-2">

                      <button
                        type="button"
                        className="flex-1 rounded-full bg-[#dfff65] py-3 text-xs font-bold"
                      >
                        Prev
                      </button>


                      <button
                        type="button"
                        className="rounded-full bg-[#333333] px-4 py-3 text-xs font-bold text-white"
                      >

                        Save

                        <Bookmark className="ml-1 inline h-3 w-3" />

                      </button>


                      <button
                        type="button"
                        className="flex-1 rounded-full bg-[#dfff65] py-3 text-xs font-bold"
                      >
                        Next
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </section>


            {/* ========================================= */}
            {/* LATEST JOBS */}
            {/* ========================================= */}

            <section className="bg-[#111111] px-6 pb-16 pt-8 text-white sm:px-10 lg:px-14">


              <div className="mx-auto max-w-7xl">


                {/* HEADING */}

                <div className="mb-10 flex items-end justify-between">


                  <div>

                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b78bea]">

                      Opportunities

                    </p>


                    <h2 className="text-4xl font-black">

                      Latest Jobs

                    </h2>

                  </div>


                  <span className="text-sm text-gray-500">

                    {filteredJobs.length} opportunities

                  </span>

                </div>


                {/* ===================================== */}
                {/* JOBS */}
                {/* ===================================== */}

                {filteredJobs.length === 0 ? (

                  <div className="rounded-[30px] border border-[#292929] bg-[#191919] p-16 text-center">


                    <Search className="mx-auto mb-4 h-10 w-10 text-gray-600" />


                    <p className="text-gray-500">

                      No jobs found.

                    </p>

                  </div>

                ) : (

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {filteredJobs.map((job) => (

                      <JobCard
                        key={job._id}
                        id={job._id}
                        title={job.title}
                        company={job.company?.name}
                        location={job.location}
                        jobType={job.jobType}
                        salary={job.salary}
                      />

                    ))}

                  </div>

                )}

              </div>

            </section>


          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Home;