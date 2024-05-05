import React from "react";
import { Box, CardMedia, Typography, Button } from "@mui/material";
import { FlashOn, BlurOn } from "@mui/icons-material";
import "./JobCard.css";

const JobCard = ({ job }) => {
  const {
    logoUrl,
    companyName,
    jobRole,
    location,
    minJdSalary,
    maxJdSalary,
    jobDetailsFromCompany,
    jdLink,
    minExp,
    maxExp,
  } = job;

  // Format the salary range
  const formattedSalaryRange = `₹${minJdSalary} - ${maxJdSalary} LPA`;

  // Function to open the job link
  const openJobLink = () => {
    window.open(jdLink, "_blank");
  };

  return (
    <Box className="job-card-container">
      <div className="job-info-box">
        <div className="company-logo-container">
          <CardMedia
            component="img"
            src={logoUrl}
            alt="Company Logo"
            className="company-logo"
          />
        </div>

        <div className="job-info">
          <Typography variant="subtitle1" className="company-name">
            {companyName}
          </Typography>
          <Typography variant="body2" className="job-role">
            {jobRole}
          </Typography>
          <Typography variant="body2" className="job-location">
            {location}
          </Typography>
        </div>
      </div>
      <div className="expected-salary-container">
        <Typography variant="body2" className="expected-salary">
          Estimated Salary: {formattedSalaryRange}
        </Typography>
      </div>
      <div className="about-us">
        <Typography variant="body2">
          <strong>About Us:</strong>
        </Typography>
        <Typography variant="body2" className="job-details">
          {jobDetailsFromCompany.substring(0, 500)}...{" "}

        </Typography>
        <div className="view-job-link-container">
          <span className="view-job-link" onClick={openJobLink}>
            View Job
          </span>
        </div>
      </div>
      <div className="experience-container">
        <Typography variant="body2" className="min-experience">
          Minimum Experience: {minExp} years
        </Typography>
      </div>
      <div className="easy-apply-button-container">
        <Button
          variant="contained"
          style={{
            backgroundColor: "rgb(85, 239, 196)",
            color: "#fff",
            width: "100%",
            textTransform: "none",
            margin: "0.7rem 0rem",
            padding: "0.7rem",
          }}
          startIcon={<FlashOn style={{ color: "yellow" }} />}
        >
          Easy Apply
        </Button>
      </div>
      <div className="unlock-referral-button-container">
        <Button
          variant="contained"
          style={{
            backgroundColor: "rgb(73, 67, 218)",
            color: "#fff",
            width: "100%",
            textTransform: "none",
            padding: "0.7rem",
          }}
          startIcon={<BlurOn style={{ color: "#fff" }} />}
        >
          Unlock Referral
        </Button>
      </div>
    </Box>
  );
};

export default JobCard;
