import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { API_PATH } from "../utils/apiPath";

const useAuth = () => {
    const {user, clearUser, updateUserData} = useContext(UserContext);
    const navigate = useNavigate();
  
    useEffect(() => {
        if (user) {
            return; 
        }

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const respone = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);

                if (isMounted && respone.data) {
                    updateUserData(respone.data);
                }
            } catch (error) {
                console.error('Error fetching user info', error);
                if (isMounted) {
                    clearUser();
                    navigate('/login');
                }
            }
        }

        fetchUserInfo();

        return () => {
            isMounted = false;
        }
    }, [updateUserData, clearUser, navigate, user]);
}

export default useAuth