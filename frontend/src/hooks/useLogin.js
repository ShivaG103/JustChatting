import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);

    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

    //   console.log(res);
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

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if ((!username, !password)) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
}
