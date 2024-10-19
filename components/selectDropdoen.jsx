import React from 'react';

const SelectDropdown = ({ name, value, options, onChange, placeholder }) => {
  return (
    <select 
      name={name} 
      className="w-[40%] custom-select rounded-md p-2 mx-1 outline-none text-black font-bold text-xs cursor-pointer bg-violet-100"  
      value={value}  
      onChange={onChange}
      required
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option, index) => (
        <option 
          key={index} 
          className="text-[#5B6170] font-bold text-xs" 
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
