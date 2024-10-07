using NotesEntities;
using NotesEntities.Operations;

namespace NotesAPI.Services
{
    public interface INotesService
    {
        Task<IQueryable<Note>> GetNotes();
        Task<IQueryable<NoteList>> GetLists();
        Task<ListContent> CheckListItem(CheckListRequest request);
        Task<Note> CreateNote(CreateNoteRequest note);
        Task<NoteList> CreateList(CreateListRequest list);
        Task<Note> UpdateNote(Note note);
        Task<NoteList> UpdateList(NoteList list);
        Task<Note> DeleteNote(Guid id);
        Task<NoteList> DeleteList(Guid id);
    }
}