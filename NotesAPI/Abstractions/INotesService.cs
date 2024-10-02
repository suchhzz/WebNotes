using NotesEntities;

namespace NotesAPI.Services
{
    public interface INotesService
    {
        Task<IQueryable<Note>> GetNotes();
        Task<IQueryable<NoteList>> GetLists();
        Task<Note> GetNoteById(Guid id);
        Task<ListContent> CheckListItem(CheckListRequest request);
        Task<Note> CreateNote(CreateNote note);
        Task<NoteList> CreateList(CreateList list);
        Task<Note> UpdateNote(Note note);
        Task<Note> DeleteNote(Guid id);
        Task<NoteList> DeleteList(Guid id);
    }
}