import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SIDE_MENU } from "../utils/data";
import CharAvatar from "./CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  console.log(fullName);

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mx-5">
        {user?.profilePhoto ? (
          <img
            src={user?.profilePhoto}
            alt="Profile Photo"
            className="w-20 h-20 bg-slate-400 rounded-full "
          />
        ) : (
          <CharAvatar fullName={fullName} width="w-20" height="h-20" />
        )}

        <h5 className="text-shadow-gray-950 font-medium leading-6 mb-2">
          {fullName}
        </h5>
      </div>

      {SIDE_MENU.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-green-400" : ""
          } py-3 px-6 rounded-lg mb-3`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
