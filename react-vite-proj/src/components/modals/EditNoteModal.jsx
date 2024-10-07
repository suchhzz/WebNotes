import { useEffect } from "react"
import EditNoteForm from "./EditNoteForm"

export default function EditNoteModal({ id, title, descripition }) {
    return (
        <>
            <div className="modal fade" id="editNoteModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <EditNoteForm
                        noteId={id}
                        noteTitle={title}
                        noteDescription={descripition} />
                </div>
            </div>
        </div>
        </>
    )
}