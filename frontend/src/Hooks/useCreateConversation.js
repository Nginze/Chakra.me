import axios from "axios";


export const useCreateConversation = (senderId, receiverId) => {
    const {data} = axios({
        method:'post',
        url: `http://localhost:5000/conversation`,
        withCredentials: true,
        data:{
            senderId,
            receiverId
        }
    })

    return data;
}