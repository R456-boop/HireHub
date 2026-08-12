import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/Layout";
import JobCard from "../components/JobCard";
import axiosInstance from "../utils/axios";

import { setAllJobs } from "../redux/jobSlice";

function Jobs() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { allJobs } = useSelector((state) => state.job);

  useEffect(() => {
  const getAllJobs = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/job/get");

      dispatch(setAllJobs(response.data.jobs));
    } catch (error) {
      console.log("Error getting jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  getAllJobs();
}, [dispatch]);
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10">

        <h1 className="text-3xl font-bold">
          Find Your Next Job
        </h1>

        <p className="mt-2 text-gray-600">
          Search and explore available job opportunities.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{loading ? (
  <p className="text-gray-500">
    Loading jobs...
  </p>
) : allJobs.length > 0 ? (
  allJobs.map((job) => (
    <JobCard
      key={job._id}
      id={job._id}
      title={job.title}
      company={job.company?.name}
      location={job.location}
      jobType={job.jobType}
      salary={job.salary}
    />
  ))
) : (
  <p className="text-gray-500">
    No jobs available.
  </p>
)}
        </div>

      </div>
    </Layout>
  );
}

export default Jobs;