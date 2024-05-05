import React, { useState } from "react";
import "./JobCard.css";

const JobCard = ({ job }) => {
  const { companyName, jobRole, location, logoUrl, minJdSalary, maxJdSalary, jdLink, jobDetailsFromCompany } = job;
  const [showFullDetails, setShowFullDetails] = useState(false);

  // Function to format salary with rupee symbol
  const formatSalary = (minSalary, maxSalary) => {
    return `Estimated Salary: ₹${minSalary} - ₹${maxSalary} LPA`;
  };

  const handleViewJobClick = () => {
    setShowFullDetails(true);
  };

  return (
    <div className="job-card">
      <div className="company-info">
        <div className="company-logo">
          <img src={logoUrl} alt={companyName} />
        </div>
        <div className="company-details">
          <h3>{companyName}</h3>
          <p className="job-role">{jobRole}</p>
          <p className="location">{location}</p>
          <p className="salary">{formatSalary(minJdSalary, maxJdSalary)}</p>
          <div className="about-company">
            <h4>About Company:</h4>
            {!showFullDetails && (
              <>
                <p className="about-us">
                  {jobDetailsFromCompany.length > 100
                    ? jobDetailsFromCompany.substring(0, 100) + "..."
                    : jobDetailsFromCompany}
                </p>
                <button className="view-job-btn" onClick={handleViewJobClick}>
                  View Job
                </button>
              </>
            )}
            {showFullDetails && (
              <a className="job-link" href={jdLink} target="_blank" rel="noopener noreferrer">
                {jdLink}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
