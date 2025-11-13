const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
        <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-xs text-gray-500">Amount : {payload[0].value}</p>
        </div>
    )
  }
};

export default CustomTooltip;
