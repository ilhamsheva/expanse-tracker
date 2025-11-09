import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/DashboardLayout";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axios";
import InfoCard from "../../cards/InfoCard";
import { separatorThousand } from "../../helper/separatorThousand";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";

const Home = () => {
  useAuth();

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.DASHBOARD.GET_DASHBOARD}`
      );
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            color="bg-green-500"
            value={separatorThousand(dashboardData?.totalBalance || 0)}
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            color="bg-orange-500"
            value={separatorThousand(dashboardData?.totalIncome || 0)}
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            color="bg-red-500"
            value={separatorThousand(dashboardData?.totalExpenses || 0)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
