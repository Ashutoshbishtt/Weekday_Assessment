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
    experience: null,
    remote: [],
    techStack: [],
    minBasePay: null,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchJobs(10, (page - 1) * 10));
  }, [dispatch, page]);

  useEffect(() => {
    applyFilters();
  }, [filters, allJobs]);

  const applyFilters = () => {
    let filteredJobs = allJobs.filter(job => {
      if (
        filters.companyName &&
        filters.companyName !== "" &&
        !job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      )
        return false;

      if (
        filters.jobRole &&
        filters.jobRole.length > 0 &&
        !filters.jobRole.some(
          role => job.jobRole.toLowerCase() === role.toLowerCase()
        )
      )
        return false;

      if (
        filters.experience !== null &&
        !checkExperience(job.minExp, job.maxExp, filters.experience)
      )
        return false;

      if (
        filters.remote &&
        filters.remote.length > 0 &&
        !filters.remote.some(location =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      )
        return false;

      if (
        filters.techStack &&
        filters.techStack.length > 0 &&
        !filters.techStack.some(stack =>
          job.jobDetailsFromCompany.toLowerCase().includes(stack.toLowerCase())
        )
      )
        return false;

      if (
        filters.minBasePay !== null &&
        (job.minJdSalary == null ||
          job.minJdSalary < parseInt(filters.minBasePay.replace("L", "")))
      )
        return false;

      return true;
    });

    setJobs(filteredJobs);
  };

  const checkExperience = (minExp, maxExp, selectedExp) => {
    if (minExp == null || maxExp == null) return false;

    return minExp <= parseInt(selectedExp) && maxExp >= parseInt(selectedExp);
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
