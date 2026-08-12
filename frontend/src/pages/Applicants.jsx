import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";

function Applicants() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  const updateStatus = async (applicationId, status) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/application/${applicationId}/status`,
        {
          status,
        }
      );

      console.log("Status updated:", response.data);

      setJob((previousJob) => ({
        ...previousJob,
        applications: previousJob.applications.map((application) =>
          application._id === applicationId
            ? { ...application, status }
            : application
        ),
      }));
    } catch (error) {
      console.log("Error updating status:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update application status"
      );
    }
  };

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/application/${id}/applicants`
        );

        console.log("Applicants:", response.data);

        setJob(response.data.job);
      } catch (error) {
        console.log("Error getting applicants:", error);
      }
    };

    getApplicants();
  }, [id]);

  if (!job) {
    return (
      <Layout>
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p>Loading applicants...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-10">

        <h1 className="text-3xl font-bold">
          Applicants
        </h1>

        <p className="mt-2 text-gray-600">
          {job.title}
        </p>

        <div className="mt-8 space-y-4">

          {job.applications?.length > 0 ? (
            job.applications.map((application) => (
              <div
                key={application._id}
                className="rounded-lg border bg-white p-5 shadow-sm"
              >

                <h2 className="text-lg font-semibold">
                  {application.applicant?.fullname}
                </h2>

                <p className="mt-1 text-gray-600">
                  {application.applicant?.email}
                </p>

                <p className="mt-2">
                  Status:{" "}
                  <span className="font-semibold">
                    {application.status}
                  </span>
                </p>

                <div className="mt-4 flex gap-3">

                  <button
                    className="rounded-md bg-green-600 px-4 py-2 text-white"
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "accepted"
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="rounded-md bg-red-600 px-4 py-2 text-white"
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                </div>

              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No applicants yet.
            </p>
          )}

        </div>

      </div>
    </Layout>
  );
}

export default Applicants;