using NoteDataAccess;
using NotesEntities;

namespace NotesAPI.Services
{
    public class NotesService : INotesService
    {
        private readonly INoteContext _noteContext;

        public NotesService(INoteContext noteContext)
        {
            _noteContext = noteContext;
        }

        public async Task<IQueryable<Note>> GetNotes()
        {
            return await _noteContext.GetNotes();
        }

        public async Task<Note> GetNoteById(Guid id)
        {
            return await _noteContext.GetNoteById(id);
        }

        public async Task<Note> CreateNote(Note note)
        {
            var createdNote = await _noteContext.AddNote(note);

            return createdNote;
        }

        public async Task<Note> UpdateNote(Note note)
        {
            var updatedNote = await _noteContext.UpdateNote(note);

            return updatedNote;
        }

        public async Task<Note> DeleteNote(Guid id)
        {
            var deletedNote = await _noteContext.DeleteNoteById(id);

            return deletedNote;
        }
    }
}
