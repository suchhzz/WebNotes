import { deleteNote } from "../../services/noteService"

export default function NoteCard({ id, title, description, onEditNote }) {

    const handleDelete = () => {
        event.preventDefault();
        deleteNote(id);
    };

    const handleNoteEdit = () => {
        onEditNote(id, title, description)
    }

    return (
        <div className="card col-3" style={{ width: '18rem' }} id={id}>
        <div className="card-body">
            <div className="card-title-container d-flex" >
                <h5 className="card-title" onClick={handleNoteEdit}>{title}</h5>
                <button className="trash-icon-button bi bi-trash-fill btn" onClick={handleDelete}></button>
            </div>
          <hr />
          <p className="card-text">{description}</p>
        </div>
    </div>
    )
}