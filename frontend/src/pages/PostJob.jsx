import { useState } from "react";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceneed: "",
    jobType: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/api/v1/job/post",
        formData
      );


      alert(response.data.message);

      setFormData({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experienceneed: "",
        jobType: "",
        position: "",
        companyId: "",
      });

    } catch (error) {
      console.log("Error posting job:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while posting the job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-10">

        <h1 className="text-3xl font-bold">
          Post a New Job
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new job opportunity for candidates.
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-8 rounded-xl border bg-white p-6 shadow-sm"
        >

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Job Title
              </label>

              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Location
              </label>

              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Salary
              </label>

              <Input
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 12"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience
              </label>

              <Input
                name="experienceneed"
                value={formData.experienceneed}
                onChange={handleChange}
                placeholder="e.g. 2 years"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Job Type
              </label>

              <Input
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                placeholder="e.g. Full Time"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Number of Positions
              </label>

              <Input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. 5"
              />
            </div>

          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Company ID
            </label>

            <Input
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              placeholder="Enter your company ID"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Requirements
            </label>

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="min-h-32 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="HTML, CSS, JavaScript, React"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-40 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe the job..."
            />
          </div>

          <Button
            type="submit"
            className="mt-6"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </Button>

        </form>

      </div>
    </Layout>
  );
}

export default PostJob;