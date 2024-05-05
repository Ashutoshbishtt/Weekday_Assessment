import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from './redux/actions';
import JobList from './components/JobList';
import Filters from './components/Filters';

const App = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const [filters, setFilters] = useState({
    minExperience: 0,
    // Add more filter properties as needed
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
    // Implement filter functionality here
  };

  return (
    <div className="app">
      <h1>Candidate Application Platform</h1>
      <Filters filters={filters} handleFilterChange={handleFilterChange} />
      <JobList jobs={jobs} />
    </div>
  );
};

export default App;
