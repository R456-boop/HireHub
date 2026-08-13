import { Link } from "react-router-dom";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";

function JobCard({
  id,
  title,
  company,
  location,
  jobType,
  salary,
}) {
  return (
    <Link to={`/jobs/${id}`}>
      <div className="rounded-xl border bg-[#111111] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-2 font-medium text-blue-600">
          {company}
        </p>

        <div className="mt-5 space-y-3 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location}
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {jobType}
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            {salary} LPA
          </div>

        </div>

        <div className="mt-6 text-sm font-medium text-blue-600">
          View Job Details →
        </div>

      </div>
    </Link>
  );
}

export default JobCard;