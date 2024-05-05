import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import "./Filter.css";

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const renderTags = (value, getTagProps) =>
    value.map((option, index) => (
      <div
        {...getTagProps({ index })}
        key={index}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <span>{option}</span>
      </div>
    ));

  return (
    <div className="filter-container">
      <div className="filter-item">
        <Autocomplete
          multiple
          options={["Remote", "Hybrid", "Inoffice"]}
          renderTags={renderTags}
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
          multiple
          options={["Frontend", "Backend", "Full Stack", "iOS", "Android"]}
          renderTags={renderTags}
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
          multiple
          options={["1-50", "51-100", "101-500", "501-1000", "1000+"]}
          renderTags={renderTags}
          renderInput={params => (
            <TextField
              {...params}
              label="No. Of Employees"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.numEmployees || []}
          onChange={(e, newValue) =>
            handleFilterChange("numEmployees", newValue)
          }
        />
      </div>
      <div className="filter-item">
        <Autocomplete
          multiple
          options={["0-1", "1-3", "3-5", "5-8", "8-20"]}
          renderTags={renderTags}
          renderInput={params => (
            <TextField
              {...params}
              label="Experience"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.experience || []}
          onChange={(e, newValue) => handleFilterChange("experience", newValue)}
        />
      </div>
      <div className="filter-item">
        <Autocomplete
          multiple
          options={["React", "Angular", "Vue", "Node.js", "Express.js"]}
          renderTags={renderTags}
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
      <div className="filter-item">
        <Autocomplete
          multiple
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
          renderTags={renderTags}
          renderInput={params => (
            <TextField
              {...params}
              label="Minimum Base Pay"
              variant="outlined"
              className="filter-input"
            />
          )}
          value={filters.minBasePay || []}
          onChange={(e, newValue) => handleFilterChange("minBasePay", newValue)}
        />
      </div>
    </div>
  );
};

export default Filters;
