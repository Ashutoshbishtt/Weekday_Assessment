import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./redux/actions";
import JobList from "./components/JobList";
import Filters from "./components/Filters";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

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
  const [page, setPage] = useState(1);
  console.log(allJobs)

  useEffect(() => {
    dispatch(fetchJobs(10, (page - 1) * 10));
  }, [dispatch, page]);

  useEffect(() => {
    applyFilters();
  }, [filters, allJobs]);

  const applyFilters = () => {
    let filteredJobs = allJobs.filter(job => {
      if (
        filters.jobRole.length > 0 &&
        !filters.jobRole.some(
          role => job.jobRole.toLowerCase() === role.toLowerCase()
        )
      )
        return false;
      if (
        filters.numEmployees.length > 0 &&
        !filters.numEmployees.includes(
          job.numEmployees ? job.numEmployees.toString() : ""
        )
      )
        return false;
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
      if (
        filters.remote.length > 0 &&
        !filters.remote.some(location =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      )
        return false;
      if (
        filters.techStack.length > 0 &&
        !filters.techStack.every(stack =>
          job.jobDetailsFromCompany.toLowerCase().includes(stack.toLowerCase())
        )
      )
        return false;
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

  const fetchMoreJobs = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="app">
      <Filters
        filters={filters}
        setFilters={setFilters}
        handleFilterChange={handleFilterChange}
      />
      <div className="job-list-container">
        <InfiniteScroll
          dataLength={jobs.length}
          next={fetchMoreJobs}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more jobs</p>}
        >
          <JobList jobs={jobs} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default App;
