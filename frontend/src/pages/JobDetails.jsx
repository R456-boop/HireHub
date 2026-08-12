
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
} from "lucide-react";

import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading ,setLoading]=useState(true);

useEffect(() => {
  const getJob = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/job/get/${id}`
      );

      setJob(response.data.job);
    } catch (error) {
      console.log("Error getting job:", error);
    } finally {
      setLoading(false);
    }
  };

  getJob();
}, [id]);

 
   if (loading) {
  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-gray-500">
          Loading job...
        </p>
      </div>
    </Layout>
  );
}

if (!job) {
  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-gray-500">
          Job not found.
        </p>
      </div>
    </Layout>
  );
}
  

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* Job Header */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">

          <h1 className="text-4xl font-bold">
            {job.title}
          </h1>

          <p className="mt-3 text-xl font-medium text-blue-600">
            {job.company?.name}
          </p>

          {/* Job information */}
          <div className="mt-6 flex flex-wrap gap-6 text-gray-600">

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {job.location}
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {job.jobType}
            </div>

            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              {job.salary} LPA
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {job.experienceneed}
            </div>

          </div>

          {/* Apply */}
          <Link to={`/jobs/${id}/apply`}>
            <Button className="mt-8 px-8">
              Apply Now
            </Button>
          </Link>

        </div>


        {/* Description */}
        <div className="mt-8 rounded-xl border bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Job Description
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            {job.description}
          </p>

        </div>


        {/* Requirements */}
        <div className="mt-8 rounded-xl border bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Requirements
          </h2>

          <ul className="mt-4 space-y-3">

            {job.requirements?.map((requirement, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />

                {requirement}
              </li>
            ))}

          </ul>

        </div>

      </div>
    </Layout>
  );
}

export default JobDetails;