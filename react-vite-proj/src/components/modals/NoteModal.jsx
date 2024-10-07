import CreateNoteForm from "./CreateNoteForm";

export default function NoteModal() {
    return (
        <div className="modal fade" id="noteModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <CreateNoteForm />
                </div>
            </div>
        </div>
    )
}