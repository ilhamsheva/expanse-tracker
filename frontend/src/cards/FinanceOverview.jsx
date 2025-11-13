import CustomPieChart from "../charts/CustomPieChart";

const colorPalette = ["#B7E5CD", "#8ABEB9", "#305669"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  // Prepare data with colors
  const data = [
    { label: "Total Balance", value: totalBalance },
    { label: "Total Income", value: totalIncome },
    { label: "Total Expenses", value: totalExpense },
  ];
  return (
    <div>
      <div className="mt-5 mb-3 p-4 border rounded-lg shadow-sm bg-white border-gray-200/50 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Finance Overview</h2>
      </div>

      <CustomPieChart
        data={data}
        label="Total Balance"
        totalAmount={`${totalBalance}`}
        color={colorPalette}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
