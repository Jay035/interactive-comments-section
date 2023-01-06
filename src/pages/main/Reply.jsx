import PropTypes from "prop-types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteBtn } from "../../components/comment/DeleteBtn";
import { EditBtn } from "../../components/comment/EditBtn";
import { Rating } from "../../components/comment/Rating";
import { ReplyBtn } from "../../components/comment/ReplyBtn";
import { auth, db } from "../../config/firebase";
import { UserAuth } from "../../context/AuthContext";

export default function Reply({ reply }) {
  const isYou = reply.username === auth.currentUser?.displayName;
  const { user, handleReply, addLike, newDoc } = UserAuth();
  const [likes, setLikes] = useState(null);
  const likesRef = collection(db, "likes");
  const navigate = useNavigate();

  const likesDoc = query(likesRef, where("commentId", "==", reply.userId));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const removeLike = async () => {
    try {
      if (!user) {
        navigate("/login");
      }
      const unLikeQuery = query(
        likesRef,
        where("commentId", "==", reply.userId),
        where("userId", "==", user?.uid)
      );

      const unLikeData = await getDocs(unLikeQuery);
      const likeId = unLikeData.docs[0].id;
      const unLike = doc(db, "likes", likeId);
      await deleteDoc(unLike);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
      console.log(likes);
      console.log(unLikeData.docs[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  // const unLike = () => {
  //   if (hasUserLiked) {
  //     console.log(hasUserLiked);
  //     setLikes((prevValue) => prevValue.length - 1);
  //     console.log(likes.length);
  //     // console.log(likes);
  //   } else if (!user) {
  //     navigate("/login");
  //   } else {
  //     console.log("invalid");
  //   }
  // };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  const dayCommentIsCreatedAt = new Date(reply.createdAt).toLocaleDateString();

  const timeCommentIsCreatedAt = new Date(reply.createdAt).toLocaleTimeString();

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="replies">
      <div className="container" key={reply.userId}>
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
            addLike={() => {
              addLike(reply.userId);
              setLikes((prev) =>
                prev
                  ? [...prev, { userId: user.uid, likeId: newDoc?.id }]
                  : [{ userId: user?.uid, likeId: newDoc?.id }]
              );
            }}
            likes={likes}
            unLike={() => {
              removeLike();
              // setLikes(
              //   (prev) => prev && prev.filter((like) => like.likeId !== likeId)
              // );
            }}
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

Reply.propTypes = {
  reply: PropTypes.object,
};
