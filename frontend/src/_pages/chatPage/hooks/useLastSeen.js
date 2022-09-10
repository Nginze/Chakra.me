import axios from "axios";
import { useQuery } from "react-query";

const useLastSeen = id => {
  const getLastSeen = async () => {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/lastseen/${id}`,
      withCredentials: true,
    });
    return data;
  };
  const { data: lastSeen, isLoading } = useQuery(["lastSeen"], getLastSeen);
  return { lastSeen, isLoading };
};

export default useLastSeen;
