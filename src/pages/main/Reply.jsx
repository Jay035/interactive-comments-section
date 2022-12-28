import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { DeleteBtn } from "../../components/comment/DeleteBtn";
import { EditBtn } from "../../components/comment/EditBtn";
import { Rating } from "../../components/comment/Rating";
import { ReplyBtn } from "../../components/comment/ReplyBtn";
import { auth, db } from "../../config/firebase";
import { UserAuth } from "../../context/AuthContext";

export default function Reply({ reply, unLike, hasUserLiked, key, addLike }) {
  const isYou = reply.username === auth.currentUser?.displayName;
  const { handleReply } = UserAuth();
  const [likes, setLikes] = useState(null);
  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("commentId", "==", reply.userId));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.length);
    console.log(likes)
  };

  const dayCommentIsCreatedAt = new Date(reply.createdAt).toLocaleDateString();

  const timeCommentIsCreatedAt = new Date(reply.createdAt).toLocaleTimeString();

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="replies">
      <div className="container" key={key}>
        <div className="content--container">
          <div className="comment--title flex justify-between align-center">
            <section className="flex align-center">
              <img
                src={auth.currentUser?.photoURL || ""}
                alt="avatar"
                className="avatar"
              />
              <div className="name flex align-center">
                <h1 className="font-bold">@{reply.username}</h1>
                {isYou && <span className="you">you</span>}
              </div>

              <p className="postTime flex">
                <span className="date">{dayCommentIsCreatedAt}</span>
                <span className="time">{timeCommentIsCreatedAt}</span>
              </p>
            </section>
            <section
              id="comment__actions--desktop"
              className="comment--actions flex justify-between align-center"
            >
              {!isYou && <ReplyBtn reply={reply} handleReply={handleReply} />}
              {isYou && <DeleteBtn reply={reply} />}
              {isYou && <EditBtn reply={reply} />}
            </section>
          </div>
          <div className="comment">{reply.comment}</div>
        </div>
        <div className="likes_reply_group flex justify-between align-center">
          <Rating
            reply={reply}
            addLike={addLike(reply.userId)}
            likes={likes}
            unLike={unLike}
            hasUserLiked={hasUserLiked}
          />
          <section className="comment--actions flex justify-between align-center">
            {!isYou && <ReplyBtn reply={reply} handleReply={handleReply} />}
            {isYou && <DeleteBtn reply={reply} />}
            {isYou && <EditBtn reply={reply} />}
          </section>
        </div>
      </div>
    </div>
  );
}
