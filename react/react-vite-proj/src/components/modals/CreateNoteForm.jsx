import { createNote } from "../../services/noteOperations";
import { useState } from "react";

export default function CreateNoteForm() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && description) {
            
            createNote(title, description);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">New note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <input className="modal-input-title" placeholder="Title" type="text" onChange={handleTitleChange}/>
                    <hr />
                    <textarea placeholder="Description" rows="5" onChange={handleDescriptionChange}></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <input type="submit" class="btn btn-primary"  value="Save changes" />
            </div>
        </form>
    )
}