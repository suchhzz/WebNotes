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

        public async Task<IQueryable<NoteList>> GetLists()
        {
            return await _noteContext.GetLists();
        }

        public async Task<Note> GetNoteById(Guid id)
        {
            return await _noteContext.GetNoteById(id);
        }

        public async Task<Note> CreateNote(CreateNote note)
        {
            var newNote = new Note
            {
                Id = Guid.NewGuid(),
                Title = note.Title,
                Description = note.Description,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                IsPinned = false
            };

            var createdNote = await _noteContext.AddNote(newNote);

            return createdNote;
        }

        public async Task<NoteList> CreateList(CreateList list)
        {
            var newList = new NoteList
            {
                Id = Guid.NewGuid(),
                Title = list.Title,
                Contents = new List<ListContent>(),
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                IsPinned = false
            };

            foreach (var item in list.Contents)
            {
                newList.Contents.Add(
                    new ListContent
                    {
                        Id = Guid.NewGuid(),
                        Text = item.Text,
                        IsChecked = false,
                    });
            }

            var createdList = await _noteContext.AddList(newList);

            return createdList;
        }

    public async Task<ListContent> CheckListItem(CheckListRequest request)
    {
            var listContent = await _noteContext.CheckList(request.Id, request.Text);

            return listContent;
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

        public async Task<NoteList> DeleteList(Guid id)
        {
            var deletedList = await _noteContext.DeleteListById(id);

            return deletedList;
        }
    }
}
