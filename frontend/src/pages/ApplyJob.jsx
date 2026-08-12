import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const applyForJob = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post(
        `/api/v1/application/apply/${id}`
      );


      alert(response.data.message);

      navigate("/jobs");

    } catch (error) {
      console.log("Error applying for job:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while applying"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-16">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Apply for Job
          </h1>

          <p className="mt-3 text-gray-600">
            Take the next step toward your career.
          </p>

        </div>

        <div className="mt-10 rounded-2xl border bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <span className="text-2xl">
              💼
            </span>
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Ready to apply?
          </h2>

          <p className="mx-auto mt-3 max-w-md text-gray-600">
            Your application will be sent directly to the recruiter.
            Make sure your profile information is up to date before applying.
          </p>

          <Button
            className="mt-8 w-full"
            onClick={applyForJob}
            disabled={loading}
          >
            {loading ? "Applying..." : "Submit Application"}
          </Button>

        </div>

      </div>
    </Layout>
  );
}

export default ApplyJob;