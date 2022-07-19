import { useEffect, useState } from "react";
import { commentData, createComment, deleteComment as deleteUserComment, currentUser as currentUserData } from "../data";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
// import swal from "@sweetalert/with-react";
export const Main = ({currentUserId}) => {
    const [activeComment, setActiveComment] = useState(null),
          currentUser = currentUserData,
          [commentsApiData, setCommentsApiData] = useState([]),
          rootComments = commentsApiData.filter(commentsData => commentsData.parentId === null);
    // console.log(rootComments)
    const getReplies = commentId => {
        return commentsApiData.filter(commentData => commentData.parentId === commentId)
    }

    // console.log(currentUser[0].username)

    // add comment function 
    const addComment = (text, parentId) => {
        console.log("addComment", text, parentId)
        createComment(text, parentId).then(comment => {
            setCommentsApiData([...commentsApiData, comment])
            setActiveComment(null)
        })
    }

    // delete comment function
    const deleteComment = (commentId) => {
        deleteUserComment(commentId).then(() => {
            const updatedCommentsApiData = commentsApiData.filter(
                (commentsData) => commentsData.id !== commentId
            )
            setCommentsApiData(updatedCommentsApiData);
            const modalBackdrop = document.querySelector('.modal-backdrop.show')
            modalBackdrop.classList.remove('show');
            modalBackdrop.classList.add('hidden');
            document.body.classList.remove('modal-open');
        })
    }
    
    useEffect(() => {
        commentData().then(data => {
            setCommentsApiData(data);
        });
    }, []);
  return (
    <div className="wrapper">
        {
            rootComments.map(rootComment => (
                <div key={rootComment.id}>
                    <Comment 
                        key={rootComment.id} 
                        comment={rootComment} 
                        replies={getReplies(rootComment.id)} 
                        currentUserId={currentUserId}
                        currentUser={currentUser[0]}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        // editComment={editComment}
                    />
                </div>
            ))
        }
        <CommentForm handleSubmit={addComment} submitLabel="SEND" currentUser={currentUser[0]} />
        
    </div>
  )
}
