import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";

import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/job/get"
        );

        setJobs(response.data.jobs);
      } catch (error) {
        console.log("Error getting jobs:", error);
      }
    };

    getJobs();
  }, []);

  // Show welcome message for 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

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

      {/* Welcome Screen */}
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <h1 className="px-4 text-center text-4xl font-bold sm:text-6xl">
            {message}
          </h1>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Find Your
            <span className="text-blue-600">
              {" "}Dream Job
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Discover job opportunities and find the perfect
            position to build your career.
          </p>

          {/* Search */}
          <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-2">

            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <Input
                placeholder="Search for jobs..."
                className="h-12 pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <Button className="h-12 w-full px-6 sm:w-auto">
              Search
            </Button>

          </div>

        </div>
      </section>

      {/* Latest Jobs */}
      <section className="mx-auto max-w-7xl px-4 py-12">

        <h2 className="mb-8 text-3xl font-bold">
          Latest Jobs
        </h2>

        {filteredJobs.length === 0 ? (

          <p className="text-gray-500">
            No jobs found.
          </p>

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

      </section>

    </Layout>
  );
}

export default Home;