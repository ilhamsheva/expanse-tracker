import { useMemo, useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SIDE_MENU } from "../utils/data";
import CharAvatar from "./CharAvatar";
import uploadImage from "../utils/uploadImage";
import { LuUpload, LuTrash } from "react-icons/lu";
import { updateProfileImage } from "../utils/updateProfileImage";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, updateUserData } = useContext(UserContext);

  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const fullName = useMemo(() => {
    return `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  }, [user?.firstName, user?.lastName]);

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

const handleUpload = useMemo(() => async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setIsUploading(true);
  try {
    // Upload image
    const response = await uploadImage(file);

    // Update database
    const updatedResponse = await updateProfileImage({profilePhoto: response.imageUrl});

    // 3. Update context & localStorage
    updateUserData(updatedResponse.user);
    localStorage.setItem("user", JSON.stringify(updatedResponse.user));

  } catch (error) {
    console.error("Error uploading photo", error);
  } finally {
    setIsUploading(false);
  }
}, [updateUserData]);

const handleRemoveImage = useMemo(() => async () => {
  // Update database
  const updatedResponse = await updateProfileImage({profilePhoto: null});

   // 2. Update context & localStorage
  localStorage.setItem("user", JSON.stringify(updatedResponse.user));
  updateUserData(updatedResponse.user);
}, [updateUserData]);


  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mx-5">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
        />

        {/* Avatar container with upload button */}
        <div className="relative">
          {user?.profilePhoto ? (
            <img
              src={user?.profilePhoto}
              alt="Profile Photo"
              className="w-20 h-20 bg-slate-400 rounded-full object-cover"
            />
          ) : (
            <CharAvatar fullName={fullName} width="w-20" height="h-20" />
          )}

          {/* BUTTON conditional - hanya satu yang muncul */}
          {user?.profilePhoto ? (
            // If photo is exist
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-1 -bottom-1 w-8 h-8 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <LuTrash className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={triggerFileInput}
              className="absolute right-1 -bottom-1 w-8 h-8 bg-green-400 hover:bg-green-500 text-white rounded-full flex items-center justify-center transition-colors"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LuUpload className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        <h5 className="text-shadow-gray-950 font-medium leading-6 mb-6">
          {fullName}
        </h5>
      </div>

      {SIDE_MENU.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "" : "text-white bg-green-400"
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
