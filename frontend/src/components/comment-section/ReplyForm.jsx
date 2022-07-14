import axios from "axios";
import { React, useContext, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { userContext } from "../../contexts/UserContext";

const ReplyForm = ({ reply, parent, toggle, disableForm }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: user } = useContext(userContext);
  const createReply = () => {
    setLoading(true);
    axios({
      method: "post",
      url: `http://localhost:5000/comment/`,
      withCredentials: true,
      data: {
        message: message,
        userId: user._id,
        userImg: user.imgUrl,
        userName: user.userName,
        parentId: parent._id,
        replier: reply?.userName,
      },
    }).then(response => {
      toggle();
      setLoading(false);
      disableForm();
    });
  };
  return (
    <div id="reply-form">
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Add a reply..."
      />
      <button onClick={createReply}>
        {!loading ? (
          <span>Add Reply</span>
        ) : (
          <ClipLoader color={"white"} loading={loading} size={10} />
        )}
      </button>
    </div>
  );
};

export default ReplyForm;
