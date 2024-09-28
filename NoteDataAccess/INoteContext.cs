using NotesEntities;

namespace NoteDataAccess
{
    public interface INoteContext
    {
        Task<Note> AddNote(Note note);
        Task<Note> DeleteNoteById(Guid id);
        Task<Note> GetNoteById(Guid id);
        Task<IQueryable<Note>> GetNotes();
        Task<Note> UpdateNote(Note note);
    }
}