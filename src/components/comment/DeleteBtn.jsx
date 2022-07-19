import { useState } from 'react';
import deleteIcon from '../assets/icon-delete.svg';

export const DeleteBtn = ({ handleDelete}) => {
    const [ modalShown, setModalShown ] = useState(false);
    const closeModal = () => {
        setModalShown(false);
        const body = document.querySelector('body');
        body.classList.remove('modal-open')
        const modalBackdrop = document.querySelector('.modal-backdrop.show');
        modalBackdrop.classList.remove('show');
        modalBackdrop.classList.add('hidden');
    }
  return (
        <div className="">
            <button type="button" className="btn deleteBtn font-bold cursor-pointer" data-toggle="modal" data-target="#myModal" onClick={() => setModalShown(true)}>
                <img src={deleteIcon} alt="icon reply"/>&nbsp; Delete
            </button>
            <div className={`${modalShown ? 'block show' : ''} modal fade`} id="myModal" data-backdrop="static">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete comment</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => closeModal()}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => closeModal()}>NO, CANCEL</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>YES, DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    // </div>
  )
}
