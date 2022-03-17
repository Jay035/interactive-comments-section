import './App.css';
// import avatar from './assets/avatars/image-amyrobson.png';
// import juliusomoAvatar from './assets/avatars/image-juliusomo.webp';
// import maxblagunAvatar from './assets/avatars/image-maxblagun.webp';
// import ramsesmironAvatar from './assets/avatars/image-ramsesmiron.webp';
import replyIcon from './assets/icon-reply.svg';
import plusIcon from './assets/icon-plus.svg';
import minusIcon from './assets/icon-minus.svg';
import deleteIcon from './assets/icon-delete.svg';
import editIcon from './assets/icon-edit.svg';

const Comment = ({comments}) => {
    // const likeCount = 1;
    // let name = 'amyrobson';
    // let postTime = '1 month ago';
    // let comment = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, doloremque distinctio doloribus fugiat facere consequuntur ab a deserunt libero repellendus officiis veniam placeat! Asperiores enim maxime, recusandae quidem voluptatum id.';
    

    return(
        <div className="hero">
            {comments.map((comment) => (
                <main key={comment.id}>
                    <div className="container">
                        {/* <div className="name">{comment.user.username}</div>
                        <img src={comment.user.image.webp} alt="amyrobson image"/>
                        <div className="comment">{comment.content}</div>
                        <button onClick={() => handleDelete(comment.id)} className="delete">DELETE item</button> */}

                        <div className="title flex justify-between align-center">
                            <div className="flex justify-between align-center">
                                <img src={comment.user.image.png} alt="avatar" className="avatar"/>
                                {console.log(comment.user.image.png)}
                                {/* {console.log(document.querySelectorAll(".avatar"))} */}
                                <h1 className="name font-bold">{ comment.user.username }</h1>
                                <p className="postTime">{ comment.createdAt}</p>
                            </div>
                            <div className="reply cursor-pointer" id="reply">
                                <img src={replyIcon} alt="icon reply"/>
                                <span className="font-bold reply">&nbsp; Reply</span>
                            </div>
                        </div>
                        <div className="comment">{ comment.content }</div>
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
                            <div className="title flex justify-between align-center">
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
                            </div>
                        </div>
                    </div>
                </main>
            ))};

            
        </div>
        
    );
}

export default Comment;