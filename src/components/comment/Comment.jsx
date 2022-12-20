// import replyIcon from '../assets/icon-reply.svg';
// import plusIcon from '../assets/icon-plus.svg';
// import minusIcon from '../assets/icon-minus.svg';
// import editIcon from '../assets/icon-edit.svg';
// import deleteIcon from '../assets/icon-delete.svg';
import { ReplyBtn } from './ReplyBtn';
import { EditBtn } from './EditBtn';
import { DeleteBtn } from './DeleteBtn';
import { Reply } from './Reply';
import { CommentForm } from './CommentForm';
import { Rating } from './Rating';
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { UserAuth } from '../../context/AuthContext';
// import { updateComment } from '../data';

export const Comment = ({ 
    comment, replies, currentUser, 
    deleteComment, activeComment, setActiveComment, 
    addComment, parentId = null, updateComment
}) => {
    // const { user } = UserAuth();
    const isYou = comment.username === auth.currentUser?.displayName,
        //   tenMinutes = 3600000,
        //   timePassed = new Date() - new Date(comment.createdAt) > tenMinutes,
        //   canReply = Boolean(currentUserId),
        //   canEdit = currentUserId === comment.userId && !timePassed,
        //   canEdit = currentUser.username === comment.user.username,
        //   canDelete = currentUserId === comment.userId && !timePassed,
          dayCommentIsCreatedAt = new Date(comment.createdAt).toLocaleDateString(),
          timeCommentIsCreatedAt = new Date(comment.createdAt).toLocaleTimeString(),
          isReplying = activeComment && 
                       activeComment.type === "replying" && 
                       activeComment.id === comment.id,

          isEditing = activeComment && 
                      activeComment.type === "editing" && 
                      activeComment.id === comment.id;
    // const [like, setLike] = useState(comment.score)
    // const replyId = parentId ? parentId : comment.id;
    // console.log(canEdit)
                    
          
    return (
        <>
            <div className="container">
                <div className="content--container">
                    <div className="comment--title flex justify-between align-center">
                        <section className="flex align-center">
                            <img src={auth.currentUser?.photoURL || ""} alt="avatar" className="avatar"/>
                            <div className="name flex align-center">
                                <h1 className="font-bold">@{ comment.username }</h1>
                                {isYou && <span className='you'>you</span>}
                            </div>
                            
                            <p className="postTime flex">
                                <span className='date'>{dayCommentIsCreatedAt}</span>
                                <span className='time'>{timeCommentIsCreatedAt}</span>
                            </p>
                        </section>
                        <section id='comment__actions--desktop' className='comment--actions flex justify-between align-center'>
                            { !isYou && <ReplyBtn comment={comment} handleReply={() => setActiveComment({ id: comment.id, type: 'replying'})} />}
                            { isYou && <DeleteBtn comment={comment} replies={replies} handleDelete={() => deleteComment(comment.id)} />}
                            { isYou && <EditBtn comment={comment} handleEdit={() => setActiveComment({ id: comment.id, type: 'editing'})} />}
                        </section>
                    </div>
                    {/* {!isEditing && <div className="comment">{ comment.content }</div>}
                    {isEditing && (
                        <CommentForm 
                            submitLabel="UPDATE"
                            active
                            initialText={comment.content}
                            handleSubmit={(text) => updateComment(text, comment.id)}
                            handleCancel={() => setActiveComment(null)}
                            currentUser={currentUser}
                        />
                    )} */}
                </div>
                <div className="likes_reply_group flex justify-between align-center">
                    { (!isEditing || !isReplying) && <Rating comment={comment} />}
                    <section className='comment--actions flex justify-between align-center'>
                        { !isYou && !isReplying && <ReplyBtn handleReply={() => setActiveComment({ id: comment.id, type: 'replying'})} />}
                        { isYou && <DeleteBtn handleDelete={() => deleteComment(comment.id)} />}
                        { isYou && !isEditing && <EditBtn handleEdit={() => setActiveComment({ id: comment.id, type: 'editing'})} />}
                    </section>
                    
                </div>
            </div>
            {/* {isReplying && <CommentForm submitLabel={"Reply"} handleSubmit={(text) => addComment(text, replyId)} currentUser={currentUser} />} */}
            {
                replies.length > 0 && (
                    <div className="replies">
                        {
                            replies.map(reply => (
                                <Reply 
                                    key={reply.id}
                                    reply={reply}
                                    comment={comment}
                                    // canDelete={canDelete}
                                    // canEdit={canEdit}
                                    // canReply={canReply}
                                    deleteReply={deleteComment}
                                    currentUser={currentUser}
                                    activeReply={activeComment}
                                    setActiveComment={setActiveComment}
                                    parentId={comment.id}
                                    addReply={addComment}
                                    // like={like} 
                                    // setLike={setLike}
                                    updateComment={updateComment}
                                    handleReply={() => setActiveComment({ id: reply.id, type: 'replying'})}
                                    handleEdit={() => setActiveComment({ id: reply.id, type: 'editing'})}
                                />
                            ))
                        }
                        {/* {isReplying && <CommentForm submitLabel={"Reply"} handleSubmit={() => addComment(text, reply.id)} />} */}
                    </div>
                )
            }
            
        </>
    )
}
