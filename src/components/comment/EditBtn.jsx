import editIcon from '../assets/icon-edit.svg';

export const EditBtn = ({handleEdit}) => {
  return (
    <div id='edit' className="comment-action cursor-pointer" onClick={handleEdit}>
        <img src={editIcon} alt="icon reply"/>
        <span className="font-bold reply">&nbsp; Edit</span>
    </div>
  )
}
