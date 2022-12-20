import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { DeleteBtn } from "../../components/comment/DeleteBtn";
import { EditBtn } from "../../components/comment/EditBtn";
import { Rating } from "../../components/comment/Rating";
import { ReplyBtn } from "../../components/comment/ReplyBtn";
import { auth, db } from "../../config/firebase";
import Reply from "./Reply";

export default function Comment({ comment, replies }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [likes, setLikes] = useState(null);
  const isYou = comment.username === auth.currentUser?.displayName;

  const dayCommentIsCreatedAt = new Date(
    comment.createdAt
  ).toLocaleDateString();

  const timeCommentIsCreatedAt = new Date(
    comment.createdAt
  ).toLocaleTimeString();

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("commentId", "==", comment.id));

  // like comment
  const addLike = async () => {
    if (!user) {
      navigate("/login");
    }
    await addDoc(likesRef, {
      userId: user?.uid,
      commentId: comment.id,
    });
  };

  // unlike a comment
  const unLike = () => {
    if (hasUserLiked) {
      setLikes(likes - 1);
    }
  };

  // get number of likes
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const hasUserLiked = likes?.find((like) => like.userId === user.uid);

  // reply function
  const handleReply = () => {
    if (!user) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      <div className="container" key={comment.id}>
        <div className="content--container">
          <div className="comment--title flex justify-between align-center">
            <section className="flex align-center">
              <img
                src={auth.currentUser?.photoURL || ""}
                alt="avatar"
                className="avatar"
              />
              <div className="name flex align-center">
                <h1 className="font-bold">@{comment.username}</h1>
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
              {!isYou && (
                <ReplyBtn comment={comment} handleReply={handleReply} />
              )}
              {isYou && <DeleteBtn comment={comment} />}
              {isYou && <EditBtn comment={comment} />}
            </section>
          </div>
          <div className="comment">{comment.comment}</div>
        </div>
        <div className="likes_reply_group flex justify-between align-center">
          <Rating
            comment={comment}
            addLike={addLike}
            likes={likes}
            unLike={unLike}
            hasUserLiked={hasUserLiked}
          />
          <section className="comment--actions flex justify-between align-center">
            {!isYou && <ReplyBtn comment={comment} handleReply={handleReply} />}
            {isYou && <DeleteBtn comment={comment} />}
            {isYou && <EditBtn comment={comment} />}
          </section>
        </div>
      </div>
      {replies?.map((reply) => (
        <Reply
          reply={reply}
          handleReply={handleReply}
          addLike={addLike}
          likes={likes}
          unLike={unLike}
          hasUserLiked={hasUserLiked}
        />
      ))}
    </>
  );
}

// Comm
