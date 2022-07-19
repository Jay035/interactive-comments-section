// import './App.css';
// import avatar from './assets/avatars/image-amyrobson.png';
// import juliusomoAvatar from './assets/avatars/image-juliusomo.webp';
// import maxblagunAvatar from './assets/avatars/image-maxblagun.webp';
// import ramsesmironAvatar from './assets/avatars/image-ramsesmiron.webp';
import replyIcon from './assets/icon-reply.svg';
import plusIcon from './assets/icon-plus.svg';
import minusIcon from './assets/icon-minus.svg';
import deleteIcon from './assets/icon-delete.svg';
import editIcon from './assets/icon-edit.svg';
import { commentData, currentUser } from './data';

export const Comment = () => {
    return(
        <div className="hero">
            <main>
                <div className="container">
                    <div className="title flex justify-between align-center">
                        <div className="flex justify-between align-center">
                        {/* {console.log(Data.comments.user.image.png)} */}
                            <img src={commentData.comments.user.image.png} alt="avatar" className="avatar"/>
                            <h1 className="name font-bold">{ commentData.comments.user.username }</h1>
                            <p className="postTime">{ commentData.comments.createdAt}</p>
                        </div>
                        <div className="reply cursor-pointer" id="reply">
                            <img src={replyIcon} alt="icon reply"/>
                            <span className="font-bold reply">&nbsp; Reply</span>
                        </div>
                    </div>
                    <div className="comment">{ commentData.comments.content }</div>
                    <div className="likes_reply_group flex justify-between align-center">
                        <div className="likes font-bold flex justify-between align-center">
                            <img className="cursor-pointer" src={plusIcon} alt="icon plus" id="plus"/>
                            <span id="like">{ commentData.comments.score }</span>
                            <img className="cursor-pointer" src={minusIcon} alt="icon minus" id="minus"/>
                        </div>
                        <div className="reply cursor-pointer">
                            <img src={replyIcon} alt="icon reply"/>
                            <span className="font-bold reply">&nbsp; Reply</span>
                        </div>
                        {/* <div className="delete_edit_group cursor-pointer flex justify-between align-center">
                                <div className="delete" onClick={() => handleDelete(comment.id)}>
                                    <img src={ deleteIcon } alt="delete icon"/>
                                    <span className="font-bold">Delete</span>
                                </div>
                                <div className="edit">
                                    <img src={ editIcon } alt="edit icon"/>
                                    <span className="font-bold">Edit</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                <div className="replies">
                    <div className="container">
                        <div className="">
                            <img src={currentUser.image.png} alt="" />
                        </div>
                        {/* <div className="title flex justify-between align-center">
                            <div className="flex justify-between align-center">
                                <img src={comment.user.image.webp} alt="avatar" className="avatar"/>
                                <h1 className="name font-bold">{ comment.replies.user}</h1>
                                <p className="postTime">{ comment.replies.createdAt}</p>
                            </div>
                            <div className="reply cursor-pointer hidden">
                                <img src={replyIcon} alt="icon reply"/>
                                <span className="font-bold reply">&nbsp; Reply</span>
                            </div>
                        </div>
                        
                        <div className="comment">{ comment.replies.content }</div>
                        <div className="likes_reply_group flex justify-between align-center">
                            <div className="likes font-bold flex justify-between align-center">
                                <img className="cursor-pointer" src={plusIcon} alt="icon plus" id="plus"/>
                                <span id="like">{ comment.score }</span>
                                <img className="cursor-pointer" src={minusIcon} alt="icon minus" id="minus"/>
                            </div>
                            <div className="reply cursor-pointer">
                                <img src={replyIcon} alt="icon reply"/>
                                <span className="font-bold reply">&nbsp; Reply</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </main>
        </div>
    );
}
