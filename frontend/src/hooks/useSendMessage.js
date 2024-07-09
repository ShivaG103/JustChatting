import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;
    //   console.log(data);
      if (res.error) {
        throw new Error(res.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};
export default useSendMessage;
