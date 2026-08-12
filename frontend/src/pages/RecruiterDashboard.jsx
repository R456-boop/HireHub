import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

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
      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Recruiter Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your jobs and applications.
          </p>
        </div>


        {/* Stats */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Jobs Posted
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {jobs.length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Recruiter
            </p>

            <p className="mt-2 text-xl font-semibold">
              Manage your opportunities
            </p>
          </div>

        </div>


        {/* Post Job */}
        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Post a New Job
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Create and publish a new job opportunity for candidates.
          </p>

          <Link to="/recruiter/post-job">
            <Button className="mt-4">
              Post Job
            </Button>
          </Link>

        </div>


        {/* My Jobs */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            My Jobs
          </h2>

          {jobs.length === 0 ? (

            <div className="mt-6 rounded-xl border bg-white p-8 text-center shadow-sm">

              <p className="text-gray-500">
                You haven't posted any jobs yet.
              </p>

              <Link to="/recruiter/post-job">
                <Button className="mt-4">
                  Post Your First Job
                </Button>
              </Link>

            </div>

          ) : (

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {jobs.map((job) => (

                <div
                  key={job._id}
                  className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <h3 className="text-xl font-semibold">
                    {job.title}
                  </h3>

                  <p className="mt-2 font-medium text-blue-600">
                    {job.company?.name}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">

                    <p>
                      📍 {job.location}
                    </p>

                    <p>
                      💼 {job.jobType}
                    </p>

                    <p>
                      💰 {job.salary} LPA
                    </p>

                    <p>
                      👥 {job.position} position(s)
                    </p>

                  </div>

                  <Link
                    to={`/recruiter/applicants/${job._id}`}
                  >
                    <Button className="mt-5 w-full">
                      View Applicants
                    </Button>
                  </Link>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </Layout>
  );
}

export default RecruiterDashboard;