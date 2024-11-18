import React, { useState } from 'react';
import GroupingSelector from '../GroupingSelector/GroupingSelector';
import SortingSelector from '../SortingSelector/SortingSelector';
import './NavBar.css';
import display from '../../assets/Display.svg'; 
import dropdownIcon from '../../assets/down.svg'; 

const NavBar = ({ grouping, setGrouping, sortOrder, setSortOrder }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="horizontal-navbar">
      <button className="dropdown-btn" onClick={toggleDropdown}>
        <img src={display} alt="Display" />
        Display
        <img src={dropdownIcon} alt="Dropdown" className="dropdown-icon" />
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <span className="label">Grouping:</span>
            <GroupingSelector grouping={grouping} setGrouping={setGrouping} />
          </div>
          <div className="dropdown-item">
            <span className="label">Sorting:</span>
            <SortingSelector sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
