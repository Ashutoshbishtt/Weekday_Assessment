import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  console.log(jobs)
  return (
    <div className="job-list">
      {Array.isArray(jobs) &&
        jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

export default JobList;
