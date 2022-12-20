import { DeleteBtn } from "../../components/comment/DeleteBtn";
import { EditBtn } from "../../components/comment/EditBtn";
import { Rating } from "../../components/comment/Rating";
import { ReplyBtn } from "../../components/comment/ReplyBtn";
import { auth } from "../../config/firebase";

export default function Reply({reply, handleReply, likes, addLike, unLike, hasUserLiked}) {
    const isYou = reply.username === auth.currentUser?.displayName;

    const dayCommentIsCreatedAt = new Date(
        reply.createdAt
      ).toLocaleDateString();
    
      const timeCommentIsCreatedAt = new Date(
        reply.createdAt
      ).toLocaleTimeString();

  return (
    <div className="">
        <div className="container" key={reply.id}>
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
              {!isYou && (
                <ReplyBtn reply={reply} handleReply={handleReply} />
              )}
              {isYou && <DeleteBtn reply={reply} />}
              {isYou && <EditBtn reply={reply} />}
            </section>
          </div>
          <div className="comment">{reply.comment}</div>
        </div>
        <div className="likes_reply_group flex justify-between align-center">
          <Rating
            reply={reply}
            addLike={addLike}
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
  )
}
