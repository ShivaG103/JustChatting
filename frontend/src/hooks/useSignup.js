import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    try {
      const res = await axios.post(
        "/api/auth/signup",
        { fullName, username, password, confirmPassword, gender },
        { headers: { "Content-Type": "application/json" } }
      );

      // console.log(res.data);
      const data = res.data;

      if (res.error) {
        throw new Error(res.error);
      }

      // update localStorage
      localStorage.setItem("chat-user", JSON.stringify(data));

      // update context value
      setAuthUser(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName, !username, !password, !confirmPassword, !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }

  return true;
}
