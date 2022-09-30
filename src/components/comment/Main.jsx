import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  commentData,
  createComment,
  deleteComment as deleteUserComment,
  currentUser as currentUserData,
  updateComment as updateCommentContent,
} from "../data";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [activeComment, setActiveComment] = useState(null),
    currentUser = currentUserData,
    [commentsApiData, setCommentsApiData] = useState([]),
    rootComments = commentsApiData.filter(
      (commentsData) => commentsData.parentId === null
    );

  const getReplies = (commentId) => {
    return commentsApiData.filter(
      (commentData) => commentData.parentId === commentId
    );
  };

  // add comment function
  const addComment = (text, parentId) => {
    createComment(text, parentId).then((comment) => {
      setCommentsApiData([...commentsApiData, comment]);
      setActiveComment(null);
    });
    console.log(user);
  };

  // delete comment function
  const deleteComment = (commentId) => {
    deleteUserComment(commentId).then(() => {
      const updatedCommentsApiData = commentsApiData.filter(
        (commentsData) => commentsData.id !== commentId
      );
      setCommentsApiData(updatedCommentsApiData);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentContent(text, commentId).then(() => {
      const updatedCommentsApiData = commentsApiData.map((commentData) => {
        if (commentData.id === commentId) {
          return { ...commentData, content: text };
        }
        return commentData;
      });
      setCommentsApiData(updatedCommentsApiData);
      setActiveComment(null);
    });
  };

  useEffect(() => {
    commentData().then((data) => {
      setCommentsApiData(data);
    });
  }, []);

  // log out function
  const handleLogOut = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await logOut();
        navigate("/");
        console.log("You are logged out");
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <main className="wrapper">
      <div className="user-details flex justify-between">
        <h3>
          User Email: <span>{user && user.email}</span>
        </h3>
        {user && console.log(user.metadata.lastSignInTime)}
        <button className="form-button" onClick={handleLogOut}>
          LOG OUT
        </button>
      </div>

      {rootComments.map((rootComment) => (
        <div key={rootComment.id}>
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUser={currentUser[0]}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment}
          />
        </div>
      ))}
      <CommentForm
        handleSubmit={addComment}
        submitLabel="SEND"
        currentUser={currentUser[0]}
      />
    </main>
  );
};
