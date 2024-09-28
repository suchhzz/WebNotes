using NotesEntities;

namespace NotesAPI.Services
{
    public interface INotesService
    {
        Task<IQueryable<Note>> GetNotes();
        Task<Note> GetNoteById(Guid id);
        Task<Note> CreateNote(Note note);
        Task<Note> UpdateNote(Note note);
        Task<Note> DeleteNote(Guid id);
    }
}