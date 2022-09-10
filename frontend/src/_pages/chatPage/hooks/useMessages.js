import axios from "axios";
import { useQuery } from "react-query";


const useMessages = (conversationId) => {
  const getMessages = async ({ conversationId }) => {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/message/${conversationId}`,
      withCredentials: true,
    });
    return data;
  };
  const { data: messages, isLoading } = useQuery(
    ["messages", conversationId],
    () => getMessages({ conversationId })
  );
  return {messages, isLoading}
};

export default useMessages;
