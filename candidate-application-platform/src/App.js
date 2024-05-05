import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./redux/actions";
import JobList from "./components/JobList";
import Filters from "./components/Filters";

const App = () => {
  const dispatch = useDispatch();
  const allJobs = useSelector(state => state.jobs);
  const [jobs, setJobs] = useState(allJobs);
  const [filters, setFilters] = useState({
    jobRole: [],
    numEmployees: [],
    experience: [],
    remote: [],
    techStack: [],
    minBasePay: [],
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
  }, [filters, allJobs]);

  const applyFilters = () => {
    let filteredJobs = allJobs.filter(job => {
      // Filter by job role
      if (
        filters.jobRole.length > 0 &&
        !filters.jobRole.some(
          role => job.jobRole.toLowerCase() === role.toLowerCase()
        )
      )
        return false;

      // Filter by number of employees
      if (
        filters.numEmployees.length > 0 &&
        !filters.numEmployees.includes(
          job.numEmployees ? job.numEmployees.toString() : ""
        )
      )
        return false;

      // Filter by experience
      if (
        filters.experience.length > 0 &&
        !filters.experience.every(exp => {
          const [minExp, maxExp] = exp.split("-");

          return (
            (!minExp ||
              (job.minExp !== null && job.minExp >= parseInt(minExp))) &&
            (!maxExp || (job.maxExp !== null && job.maxExp <= parseInt(maxExp)))
          );
        })
      )
        return false;

      // Filter by remote location
      if (
        filters.remote.length > 0 &&
        !filters.remote.some(location =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      )
        return false;

      // Filter by tech stack
      if (
        filters.techStack.length > 0 &&
        !filters.techStack.every(stack =>
          job.jobDetailsFromCompany.toLowerCase().includes(stack.toLowerCase())
        )
      )
        return false;

      // Filter by minimum base pay
      if (filters.minBasePay.length > 0) {
        const minSalary = parseInt(filters.minBasePay[0].replace("L", ""));
        if (job.minJdSalary === null || job.minJdSalary < minSalary)
          return false;
      }

      return true;
    });
    setJobs(filteredJobs);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <div className="app">
      <h1>Candidate Application Platform</h1>
      <Filters
        filters={filters}
        setFilters={setFilters}
        handleFilterChange={handleFilterChange}
      />
      <JobList jobs={jobs} />
    </div>
  );
};

export default App;
