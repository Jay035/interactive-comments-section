import { UserAuth } from "../../context/AuthContext";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
  commentData,
  createComment,
  deleteComment as deleteUserComment,
  currentUser as currentUserData,
  updateComment as updateCommentContent,
} from "../../components/data";
import { CommentForm } from "../../components/comment/CommentForm";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../Footer";
import { auth, db } from "../../config/firebase";
import Comment from "./Comment";
import Loading from "../Loading";
import { useAuthState } from "react-firebase-hooks/auth";

export const Main = () => {
  const [loading, setLoading] = useState(true);
  const [commentsList, setCommentsList] = useState([]);
  const commentsRef = collection(db, "posts");
  const rootComments = commentsList?.filter((data) => data.parentId === "null");
  // const { user } = UserAuth();
  // const navigate = useNavigate();

  // const getReplies = (id) => {
  //   return commentsList?.filter((data) => data.parentId === id)
  // };

  // const likesRef = collection(db, "likes");

  // const addLike = async (commentId) => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  //   await addDoc(likesRef, {
  //     userId: user?.uid,
  //     commentId: commentId,
  //   });
  // };

  const getComments = async () => {
    const data = await getDocs(commentsRef);
    setCommentsList(data?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading((prevValue) => !prevValue);
  };

  // run the function only when the page loads
  useEffect(() => {
    getComments();
  }, []);

  // const [activeComment, setActiveComment] = useState(null),
  //   currentUser = currentUserData,
  //   [commentsApiData, setCommentsApiData] = useState([]);
  // rootComments = commentsApiData.filter(
  //   (commentsData) => commentsData.parentId === null
  // );

  // add comment function
  // const addComment = (text, parentId) => {
  //   createComment(text, parentId).then((comment) => {
  //     setCommentsApiData([...commentsApiData, comment]);
  //     setActiveComment(null);
  //   });
  // console.log(user);
  // };

  // delete comment function
  // const deleteComment = (commentId) => {
  //   deleteUserComment(commentId).then(() => {
  //     const updatedCommentsApiData = commentsApiData.filter(
  //       (commentsData) => commentsData.id !== commentId
  //     );
  //     setCommentsApiData(updatedCommentsApiData);
  //   });
  // };

  // const updateComment = (text, commentId) => {
  //   updateCommentContent(text, commentId).then(() => {
  //     const updatedCommentsApiData = commentsApiData.map((commentData) => {
  //       if (commentData.id === commentId) {
  //         return { ...commentData, content: text };
  //       }
  //       return commentData;
  //     });
  //     setCommentsApiData(updatedCommentsApiData);
  //     setActiveComment(null);
  //   });
  // };

  // useEffect(() => {
  //   commentData().then((data) => {
  //     setCommentsApiData(data);
  //   });
  // }, []);

  // log out function
  // const handleLogOut = async () => {
  //   if (window.confirm("Are you sure you want to log out?")) {
  //     try {
  //       await logOut();
  //       navigate("/");
  //       console.log("You are logged out");
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   }
  // };

  return (
    <main className="wrapper">
      {loading ? (
        <Loading />
      ) : (
        rootComments?.map((comment) => (
          <Comment
            comment={comment}
            // replies={getReplies(commentId)}
            commentsList={commentsList}
            // addLike={addLike}
          />
        ))
      )}

      {/* {rootComments.map((rootComment) => (
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
      /> */}
      <Footer />
    </main>
  );
};


// Main.propTypes = {
//   comment
// }