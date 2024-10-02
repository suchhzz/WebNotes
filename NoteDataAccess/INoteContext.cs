using NotesEntities;

namespace NoteDataAccess
{
    public interface INoteContext
    {
        Task<Note> AddNote(Note note);
        Task<NoteList> AddList(NoteList list);
        Task<Note> DeleteNoteById(Guid id);
        Task<NoteList> DeleteListById(Guid id);
        Task<Note> GetNoteById(Guid id);
        Task<IQueryable<Note>> GetNotes();
        Task<IQueryable<NoteList>> GetLists();
        Task<Note> UpdateNote(Note note);
        Task<User> AddUser(User user);
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserById(Guid id);
        Task<ListContent> CheckList(Guid id, string text);
    }
}