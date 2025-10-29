const SelectField = ({ label, value, onChange, options = [] }) => {
  return (
    <div>
      <label className="text-[14px] text-slate-600">{label}</label>
      
      <div className="select-box">
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
