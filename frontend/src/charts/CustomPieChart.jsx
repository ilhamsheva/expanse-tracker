import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  color,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          dataKey="value"
          nameKey="label"
          outerRadius={100}
          labelLine={false}
          innerRadius={70}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % color.length]} />
          ))}
        </Pie>

        <Tooltip content={CustomTooltip} />

        <Legend content={CustomLegend} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-15}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill={color}
              fontSize="19px"
              fontWeight="bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
