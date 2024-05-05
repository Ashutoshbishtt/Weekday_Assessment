import React from 'react';

const Filters = ({ filters, handleFilterChange }) => {
  return (
    <div className="filters">
      <label>Min Experience:
        <input type="number" value={filters.minExperience} onChange={(e) => handleFilterChange('minExperience', e.target.value)} />
      </label>
      {/* Add more filter inputs based on requirements */}
    </div>
  );
};

export default Filters;
