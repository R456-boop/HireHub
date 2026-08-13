import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";

function Application() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/application/get"
        );

     

        setApplications(response.data.applications);
      } catch (error) {
        console.log("Error getting applied jobs:", error);
      }
    };

    getAppliedJobs();
  }, []);

 return (
  <Layout>
    <div className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-white">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-[#9b5cff]">
          My Applications
        </h1>

        <p className="mt-2 text-lg text-[#dfff4f]">
          Jobs you have applied for.
        </p>

        <div className="mt-10 space-y-6">

          {applications.length === 0 ? (
            <p className="text-gray-400">
              You have not applied for any jobs yet.
            </p>
          ) : (
            applications.map((application) => (
              <div
                key={application._id}
                className="rounded-2xl border border-[#292929] bg-[#111111] p-6 shadow-lg"
              >

                <h2 className="text-2xl font-bold text-white">
                  {application.job.title}
                </h2>

                <p className="mt-3 text-gray-300">
                  {application.job.location}
                </p>

                <p className="mt-2 text-gray-300">
                  {application.job.jobType}
                </p>

                <p className="mt-4 text-gray-300">
                  Status:

                  <span className="ml-2 rounded-full bg-[#dfff4f] px-4 py-1 text-sm font-semibold text-black">
                    {application.status}
                  </span>
                </p>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  </Layout>

  );
}

export default Application;