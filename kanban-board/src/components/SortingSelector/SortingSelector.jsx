import React from 'react';
import './SortingSelector.css';

const SortingSelector = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="selector">
      
      <select
        id="sorting"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="priority">Priority</option>
        <option value="title">Title (A-Z)</option>
      </select>
    </div>
  );
};

export default SortingSelector;
