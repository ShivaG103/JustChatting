import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setconversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
        setLoading(true);
        try {
          const res = await axios.get("/api/users");
          const data = res.data;
          if (data.error) {
            throw new Error(data.error);
          }
    
          setconversations(data)
        } catch (error) {
            console.log(error)
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };

      getConversations();
  }, [])
  

  

  return { loading, conversations };
};
export default useGetConversations;
