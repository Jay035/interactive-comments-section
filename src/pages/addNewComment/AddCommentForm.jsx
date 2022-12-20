import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";

export default function AddCommentForm() {
  const [user] = useAuthState(auth);
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
    await addDoc(commentsRef, {
      comment: data.comment,
      username: user?.displayName,
      userId: user?.uid,
    });
    success();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  function success() {
    swal({
      title: "Comment sent!",
      text: "",
      icon: "success",
    });
  }

  return (
    <form className="comment-form " onSubmit={handleSubmit(onAddComment)}>
      <textarea
        cols="50"
        rows="5"
        placeholder="Your Comment"
        {...register("comment")}
      ></textarea>
      <p style={{ color: "red" }}>{errors.comment?.message}</p>
      <div className="flex justify-between">
        <img
          src={auth.currentUser?.photoURL || ""}
          width="50"
          height="50"
          alt=""
        />
        <input className="btn" type="submit" value="SEND" />
      </div>
    </form>
  );
}
