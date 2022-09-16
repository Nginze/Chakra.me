import axios from "axios";
import { useQuery } from "react-query";

const useNotifications = id => {
  const getActivity = async ({id}) => {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/notification/${id}`,
      withCredentials: true,
    });
    return data;
  };
  const { data: notifications, isLoading } = useQuery(
    ["notifications", id],
    () => getActivity({id}),
    {enabled: !!id}
  );

  return { notifications, isLoading };
};

export default useNotifications;
