import axios from "axios";
import { useQuery } from "react-query";

const useConversations = id => {
  const getConversations = async () => {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/conversation/${id}`,
      withCredentials: true,
    });
    return data;
  };
  const { data: conversations, isLoading } = useQuery(
    ["conversations"],
    getConversations
  );
  return {
    conversations,
    isLoading,
  };
};

export default useConversations;
