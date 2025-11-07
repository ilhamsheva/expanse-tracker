import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/DashboardLayout"

const Home = () => {
  useAuth();
  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto"></div>
    </DashboardLayout>
  )
}

export default Home;