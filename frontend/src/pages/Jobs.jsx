import { useEffect, useState } from "react";
import { Search, MapPin, Briefcase, ChevronDown } from "lucide-react";

import Layout from "../components/Layout";
import JobCard from "../components/JobCard";
import axiosInstance from "../utils/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

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

  // FILTER JOBS
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.name?.toLowerCase().includes(searchText);

    const matchesLocation =
      !location ||
      job.location?.toLowerCase().includes(location.toLowerCase());

    const matchesJobType =
      !jobType ||
      job.jobType?.toLowerCase() === jobType.toLowerCase();

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType
    );
  });

  return (
    <Layout>

      {/* ========================================= */}
      {/* MAIN BLACK BACKGROUND */}
      {/* ========================================= */}

      <div className="min-h-screen bg-[#0d0d0d] px-5 py-12 text-white sm:px-8 lg:px-16">

        <div className="mx-auto max-w-7xl">

          {/* ========================================= */}
          {/* HEADING */}
          {/* ========================================= */}

          <div className="mb-10">

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[#9b5cff]">
                Find Your Next Job
              </span>
            </h1>

            <p className="mt-5 text-lg font-semibold text-white sm:text-xl">
              Search and explore available job opportunities.
            </p>

          </div>


          {/* ========================================= */}
          {/* SEARCH SECTION */}
          {/* ========================================= */}

          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_auto]">

            {/* SEARCH */}
            <div className="relative">

              <Search
                className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search jobs by title, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-16 w-full rounded-xl border border-[#333333] bg-[#111111] pl-14 pr-5 text-white outline-none transition placeholder:text-gray-500 focus:border-[#9b5cff]"
              />

            </div>



               


            {/* SEARCH BUTTON */}
            <button
              type="button"
              className="flex h-16 items-center justify-center gap-3 rounded-xl bg-[#914cff] px-8 text-base font-bold text-white transition hover:bg-[#7d3de0]"
            >

              <Search className="h-5 w-5" />

              Search

            </button>

          </div>




          {/* ========================================= */}
          {/* JOBS */}
          {/* ========================================= */}

          <div className="mt-7">

            {filteredJobs.length === 0 ? (

              /* EMPTY JOB CARD */

              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#292929] bg-[#111111] px-6 text-center">

                <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-[#392650] bg-[#1d1528]">

                  <Briefcase
                    className="h-10 w-10 text-[#a45cff]"
                  />

                </div>

                <h2 className="text-2xl font-bold text-white">
                  No jobs available.
                </h2>

                <p className="mt-3 text-base text-gray-400">
                  There are currently no jobs available.
                  Please check back later.
                </p>

              </div>

            ) : (

              /* JOB CARDS */

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {filteredJobs.map((job) => (

                  <div
                    key={job._id}
                    className="rounded-2xl border border-[#292929] bg-[#111111] p-1 transition hover:border-[#914cff]"
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

      </div>

    </Layout>
  );
}

export default Jobs;