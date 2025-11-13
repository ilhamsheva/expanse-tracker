import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex gap-2 flex-wrap mt-4 space-x-6 justify-center">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full" style={{ background: entry.color }} />
          <span className="text-sm text-gray-700">{entry.name}</span>{" "}
          <span className="text-xs text-gray-500">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
