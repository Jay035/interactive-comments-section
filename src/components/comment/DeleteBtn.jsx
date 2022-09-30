import deleteIcon from "../assets/icon-delete.svg";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const DeleteBtn = ({ handleDelete }) => {
  const navigate = useNavigate();
  // open modal
  function openModal() {
    showModal();
  }

  // show delete modal
  function showModal() {
    const modalContent = document.createElement("div");
    modalContent.className = "modal--content";

    modalContent.innerHTML = `
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        `;

    swal({
      title: "Delete comment",
      content: modalContent,
      // icon: "success",
      buttons: {
        cancel: "NO, CANCEL",
        delete: {
          text: "YES, DELETE",
          value: "delete",
        },
      },
    }).then((value) => {
      switch (value) {
        case "cancel":
          break;

        case "delete":
          handleDelete();
          break;

        default:
          break;
      }
    });
  }
  return (
    <button
      type="button"
      className="deleteBtn font-bold cursor-pointer"
      onClick={openModal}
    >
      <img src={deleteIcon} alt="delete icon" />
      &nbsp; Delete
    </button>
  );
};
