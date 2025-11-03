import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/InputField";
import validateEmail from "../../validate/validateEmail";
import axiosInstance from "../../utils/axios";
import { API_PATH } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 8) {
      setError("Password at least 8 character");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/home");
      }
    } catch (e) {
      if (e.response && e.response.data.message) {
        setError(e.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="md:w-full w-full h-3/4 md:h-full flex flex-col justify-center">
        <h2 className="text-xl font-semibold">Welcome Back</h2>
        <p className="text-xs text-slate-600 mt-[5px] mb-6">
          Please enter detail you login
        </p>

        <form onSubmit={handleLogin}>
          <InputField
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="text"
          />

          <InputField
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password Address"
            placeholder="Enter your password"
            type="password"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}

          <button type="submit" className="btn-primary cursor-pointer">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Do'nt have an account?{" "}
            <Link
              className="font-medium underline text-purple-600"
              to="/signup"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
