import React from 'react';
import '../css/DropDown.css';

const Dropdown = ({ id, label, options, onSelect }) => {
  return (
    <select id={id} className="form-control" onChange={(e) => onSelect(e.target.value)}>
      <option value="">{label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Dropdown;
