import replyIcon from '../assets/icon-reply.svg';

export const ReplyBtn = ({ handleReply }) => {
    return (
        <div id='reply' className="comment-action cursor-pointer" onClick={handleReply}>
            <img src={replyIcon} alt="icon reply"/>
            <span className="font-bold reply">&nbsp; Reply</span>
        </div>
    )
}
