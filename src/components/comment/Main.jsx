import { useEffect, useState } from "react";
import { 
    commentData, createComment, 
    deleteComment as deleteUserComment, 
    currentUser as currentUserData, 
    updateComment as updateCommentContent } from "../data";
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
            // hide modal 
            const modalBackdrop = document.querySelector('.modal-backdrop.show')
            modalBackdrop.classList.remove('show');
            modalBackdrop.classList.add('hidden');
            document.body.classList.remove('modal-open');
        })
    }

    const updateComment = (text, commentId) => {
        updateCommentContent(text, commentId).then(() => {
            const updatedCommentsApiData = commentsApiData.map(commentData => {
                if(commentData.id === commentId){
                    return {...commentData, content: text};
                }
                return commentData;
            })
            setCommentsApiData(updatedCommentsApiData);
            setActiveComment(null);
            
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
                        updateComment={updateComment}
                        // editComment={editComment}
                    />
                </div>
            ))
        }
        <CommentForm handleSubmit={addComment} submitLabel="SEND" currentUser={currentUser[0]} />
        
    </div>
  )
}
