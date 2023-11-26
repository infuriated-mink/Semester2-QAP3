// src/components/Dropdown.js
import React from 'react';

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
