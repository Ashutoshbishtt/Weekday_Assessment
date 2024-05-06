import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import "./Filter.css";

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const renderTags = (value, filterName) =>
    value.map((option, index) => (
      <Chip
        label={option}
        key={index}
        onDelete={() => {
          const newValue = [...value];
          newValue.splice(index, 1);
          handleFilterChange(filterName, newValue);
        }}
      />
    ));

  return (
    <div className="filter-container">
      <div className="filter-item">
        <TextField
          label="Search Company Name"
          variant="outlined"
          className="filter-input"
          onChange={e => handleFilterChange("companyName", e.target.value)}
        />
      </div>
      <div className="filter-item">
        <Autocomplete
          options={["Remote", "Hybrid", "Inoffice"]}
          renderTags={value => renderTags(value, "remote")}
          renderInput={params => (
            <TextField
              {...params}
              label="Remote"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.remote || []}
          onChange={(e, newValue) => handleFilterChange("remote", newValue)}
        />
      </div>
      <div className="filter-item">
        <Autocomplete
          options={["Frontend", "Backend", "Full Stack", "iOS", "Android"]}
          renderTags={value => renderTags(value, "jobRole")}
          renderInput={params => (
            <TextField
              {...params}
              label="Roles"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.jobRole || []}
          onChange={(e, newValue) => handleFilterChange("jobRole", newValue)}
        />
      </div>
      <div className="filter-item">
        <Autocomplete
          options={[
            "0L",
            "10L",
            "20L",
            "30L",
            "40L",
            "50L",
            "60L",
            "70L",
            "80L",
            "90L",
            "100L+",
          ]}
          renderTags={value => renderTags(value, "minBasePay")}
          renderInput={params => (
            <TextField
              {...params}
              label="Minimum Base Pay"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.minBasePay || null}
          onChange={(e, newValue) => handleFilterChange("minBasePay", newValue)}
          autoComplete="off"
        />
      </div>
      <div className="filter-item">
        <Autocomplete
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          renderTags={value => renderTags(value, "experience")}
          renderInput={params => (
            <TextField
              {...params}
              label="Experience"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.experience || null}
          onChange={(e, newValue) => handleFilterChange("experience", newValue)}
          autoComplete="off"
        />
      </div>
      <div className="filter-item">
        <Autocomplete
          options={["React", "Angular", "Vue", "Node.js", "Express.js"]}
          renderTags={value => renderTags(value, "techStack")}
          renderInput={params => (
            <TextField
              {...params}
              label="Tech Stack"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.techStack || []}
          onChange={(e, newValue) => handleFilterChange("techStack", newValue)}
        />
      </div>
    </div>
  );
};

export default Filters;
