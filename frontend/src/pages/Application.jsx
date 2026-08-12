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
      <div className="mx-auto max-w-5xl px-4 py-10">

        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <p className="mt-2 text-gray-600">
          Jobs you have applied for.
        </p>

        <div className="mt-8 space-y-4">

          {applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application._id}
                className="rounded-lg border bg-white p-5 shadow-sm"
              >

                <h2 className="text-xl font-semibold">
                  {application.job?.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {application.job?.location}
                </p>

                <p className="mt-1 text-gray-600">
                  {application.job?.jobType}
                </p>

               <div className="mt-4">
  <span className="text-sm text-gray-600">
    Status:
  </span>

  <span
    className={`ml-2 rounded-full px-3 py-1 text-sm font-semibold ${
      application.status === "accepted"
        ? "bg-green-100 text-green-700"
        : application.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {application.status}
  </span>
</div>

              </div>
            ))
          ) : (
            <p className="text-gray-500">
              You haven't applied for any jobs yet.
            </p>
          )}

        </div>

      </div>
    </Layout>
  );
}

export default Application;