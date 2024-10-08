import { useEffect, useState } from "react";
import { editNote } from "../../services/noteService";

export default function EditNoteForm({ noteId, noteTitle, noteDescription }) {
    
    const [title, setTitle] = useState(noteTitle);
    const [description, setDescription] = useState(noteDescription);
    const [id, setId] = useState(noteId);

    useEffect(() => {
        console.log("input " + noteTitle + " " + noteDescription);
        console.log("state " + title + " " + description);

        setTitle(noteTitle);
        setDescription(noteDescription);
        setId(noteId);
    }, [noteTitle, noteDescription]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && description) {
            editNote(id, title, description);
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <input className="modal-input-title" placeholder="Title" type="text" value={title} onChange={handleTitleChange}/>
                    <hr />
                    <textarea placeholder="Description" rows="5" value={description} onChange={handleDescriptionChange}></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <input type="submit" class="btn btn-primary"  value="Save" />
            </div>
        </form>
    )
}