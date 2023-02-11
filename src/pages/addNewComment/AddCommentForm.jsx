import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { useState } from "react";

export default function AddCommentForm() {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    comment: yup.string().required("You must add a comment."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  }); 

  const commentsRef = collection(db, "posts");

  const onAddComment = async (data) => {
    try{

      const res = await addDoc(commentsRef, {
        comment: data.comment,
        username: user?.displayName,
        userId: user?.uid,
        parentId: "null",
        score: 0,
        createdAt: new Date().toISOString()
      });
      console.log(res?.docs);
      console.log(comment)
      setComment("");
    } catch(err){
      console.log(err.message)
      error();
    }
    // console.log(data?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // success();
    // setTimeout(() => {
    //   navigate("/");
    // }, 2000);
  };

  function success() {
    swal({
      title: "Comment sent!",
      text: "",
      icon: "success",
    });
  }

  function error() {
    swal({
      title: "Error",
      text: "Kindly check your network connection and try again",
      icon: "error",
    });
  }

  return (
    <form className="comment-form " onSubmit={handleSubmit(onAddComment)}>
      <textarea
        cols="50"
        rows="5"
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your Comment"
        // value={comment}
        {...register("comment")}
      ></textarea>
      <p style={{ color: "red" }}>{errors.comment?.message}</p>
      <div className="flex justify-between">
      {/* {auth.currentUser.photoURL && ( */}

        <img
          src={auth.currentUser.photoURL || ""}
          width="50"
          height="50"
          alt=""
        />
      {/* )} */}
      {/* {!auth.currentUser.photoURL && (

        <div className="">A</div>
      )} */}
        <input className="btn" type="submit" value="SEND" />
      </div>
    </form>
  );
}
