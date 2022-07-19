import { ReplyBtn } from './ReplyBtn';
import { EditBtn } from './EditBtn';
import { DeleteBtn } from './DeleteBtn';
import replyIcon from '../assets/icon-reply.svg';
import plusIcon from '../assets/icon-plus.svg';
import minusIcon from '../assets/icon-minus.svg';
import { CommentForm } from './CommentForm';
import { Rating } from './Rating';

export const Reply = ({
    reply, canReply, canEdit, 
    canDelete, comment, deleteReply,
    currentUser,  handleReply, handleEdit,
    activeReply, parentId = reply.id, addReply
}) => {

    const isYou = reply.user.username === currentUser.username;
    const isReplying = activeReply && 
                       activeReply.type === "replying" && 
                       activeReply.id === reply.id;

    const isEditing = activeReply && 
                      activeReply.type === "editing" && 
                      activeReply.id === reply.id;
    const replyId = parentId ? parentId : comment.id;
    // console.log(currentUser.username)
  return (
    <>
    <div key={reply.id} className="container">
        <div className="content--container">
            <div className="comment--title flex justify-between align-center">
                <section className="flex align-center">
                    <img src={reply.user.image.png} alt="avatar" className="avatar"/>
                    <div className="name flex align-center">
                        <h1 className="font-bold">{ reply.user.username }</h1>
                        {isYou && <span className='you'>you</span>}
                    </div>
                    <p className="postTime flex">
                        <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                        <span>{new Date(reply.createdAt).toLocaleTimeString()}</span>
                    </p>
                </section>
                <section className='comment--actions flex justify-between align-center'>
                    { !isYou && <ReplyBtn handleReply={handleReply} />}
                    { isYou && <DeleteBtn handleDelete={() => deleteReply(reply.id)} />}
                    { isYou && <EditBtn handleEdit={handleEdit} />}
                </section>
            </div>
            <div className="comment"><span className='replyingTo font-bold'>@{reply.replyingTo} </span>{ reply.content }</div>
        </div>
                                    
        <div className="likes_reply_group flex justify-between align-center">
            <Rating comment={comment} />
            <section className='comment--actions flex justify-between align-center'>
                {!isYou && <ReplyBtn comment={comment} handleReply={handleReply} />}
                { isYou && <DeleteBtn comment={comment} handleDelete={() => deleteReply(reply.id)} />}
                { isYou && <EditBtn comment={comment} handleEdit={handleEdit} />}
            </section>
        </div>
    </div>
    {isReplying && <CommentForm submitLabel={"Reply"} handleSubmit={(text) => addReply(text, replyId)} currentUser={currentUser} />}
    </>
  )
}
