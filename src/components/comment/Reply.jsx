import { ReplyBtn } from './ReplyBtn';
import { EditBtn } from './EditBtn';
import { DeleteBtn } from './DeleteBtn';
import { CommentForm } from './CommentForm';
import { Rating } from './Rating';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { auth } from '../../config/firebase';

export const Reply = ({
    reply, comment, deleteReply,
    currentUser,  handleReply, handleEdit,
    activeReply, parentId = comment.id, 
    addReply, updateComment, setActiveComment
}) => {
    // const {user} = UserAuth();
    const isYou = comment.userDetails.username === auth.currentUser?.displayName;
    const isReplying = activeReply && 
                       activeReply.type === "replying" && 
                       activeReply.id === reply.id;

    const isEditing = activeReply && 
                      activeReply.type === "editing" && 
                      activeReply.id === reply.id;
    const replyId = parentId ? parentId : comment.id,
          [like, setLike] = useState(reply.score),
          replyingTo = comment.userDetails.username;
  return (
    <>
    <div key={reply.id} className="container">
        <div className="content--container">
            <div className="comment--title flex justify-between align-center">
                <section className="flex align-center">
                    <img src={reply.userDetails.image.png} alt="avatar" className="avatar"/>
                    <div className="name flex align-center">
                        <h1 className="font-bold">{ reply.userDetails.username }</h1>
                        {isYou && <span className='you'>you</span>}
                    </div>
                    <p className="postTime flex">
                        <span className='date'>{new Date(reply.createdAt).toLocaleDateString()}</span>
                        <span className='time'>{new Date(reply.createdAt).toLocaleTimeString()}</span>
                    </p>
                </section>
                <section className='comment--actions flex justify-between align-center'>
                    { !isYou && !isReplying && <ReplyBtn handleReply={handleReply} />}
                    { isYou && <DeleteBtn handleDelete={() => deleteReply(reply.id)} /> }
                    { isYou && !isEditing && <EditBtn handleEdit={handleEdit} />}
                </section>
            </div>
            {/* <div className="comment"><span className='replyingTo font-bold'>@{reply.replyingTo} </span>{ reply.content }</div> */}
                {!isEditing && <div className="comment"><span className='replyingTo font-bold'>@{replyingTo} </span>{ reply.content }</div>}
                {isEditing && (
                    <CommentForm 
                        submitLabel="UPDATE"
                        active
                        initialText={reply.content}
                        handleSubmit={(text) => updateComment(text, reply.id)}
                        handleCancel={() => setActiveComment(null)}
                        currentUser={currentUser}
                    />
                )}
        </div>
                                    
        <div className="likes_reply_group flex justify-between align-center">
            <Rating like={like} setLike={setLike} />
            <section className='comment--actions flex justify-between align-center'>
                { !isYou && !isReplying && <ReplyBtn comment={comment} handleReply={handleReply} />}
                { isYou && <DeleteBtn handleDelete={() => deleteReply(reply.id)} /> }
                { isYou && !isEditing && <EditBtn comment={comment} handleEdit={handleEdit} />}
            </section>
        </div>
    </div>
    {isReplying && <CommentForm submitLabel={"Reply"} handleSubmit={(text) => addReply(text, replyId)} currentUser={currentUser} />}
    </>
  )
}
