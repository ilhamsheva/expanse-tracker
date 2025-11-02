import { useState } from "react";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import validateEmail from "../../validate/validateEmail";
import SelectField from "../../components/SelectField";
import UploadFields from "../../components/UploadFields";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName) {
      setError("Please enter your first name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    } else if (password.length < 8) {
      setError("Password at least 8 character");
      return;
    }

    if (!options) {
      setError("Please select an option");
      return;
    }

    setError("");
  };
  return (
    <AuthLayout>
      <div className="w-full h-full flex flex-col justify-center">
        <h2 className="font-bold mb-1 text-2xl">Welcome to Website</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Join us and get access to all features
        </p>

        {/* Form untuk signup */}
        <form onSubmit={handleSignUp}>

          <UploadFields/>
          
          <div className="separate-form">
            <InputField
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
              type="text"
            />

            <InputField
              label="Last Name (Optional)"
              placeholder="Enter your last name"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
              type="text"
            />
          </div>

          <SelectField
            label="Gender"
            value={options}
            onChange={({ target }) => setOptions(target.value)}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              {value: "other", label: "Other"}
            ]}
          />

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
            SIGNUP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium underline text-purple-600" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
