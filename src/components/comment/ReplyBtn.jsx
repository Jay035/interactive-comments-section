import replyIcon from '../assets/icon-reply.svg';
import { useNavigate } from 'react-router-dom';

export const ReplyBtn = ({ handleReply }) => {
    const navigate = useNavigate();
    const reply = () => {
         handleReply();
    }
    return (
        <div id='reply' className="comment-action cursor-pointer" onClick={reply}>
            <img src={replyIcon} alt="icon reply"/>
            <span className="font-bold reply">&nbsp; Reply</span>
        </div>
    )
}
