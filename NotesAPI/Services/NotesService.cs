using Microsoft.EntityFrameworkCore;
using NoteDataAccess;
using NotesAPI.Abstractions;
using NotesEntities;
using NotesEntities.Operations;
using System.IdentityModel.Tokens.Jwt;

namespace NotesAPI.Services
{
    public class NotesService : INotesService
    {
        private readonly NotesDbContext _noteContext;
        private readonly IUsersService _userService;

        public NotesService(NotesDbContext noteContext, IUsersService userService)
        {
            _noteContext = noteContext;
            _userService = userService;
        }

        public async Task<IQueryable<Note>> GetNotes()
        {
            var userId = await _userService.GetUserIdByToken();

            var user = await _noteContext.Users
                .Include(u => u.Notes)
                .FirstOrDefaultAsync(u => u.Id == userId);

            return user.Notes
                .OrderBy(n => n.CreateDate)
                .AsQueryable();
        }

        public async Task<IQueryable<NoteList>> GetLists()
        {
            var userId = await _userService.GetUserIdByToken();

            var user = await _noteContext.Users
                .Include(u => u.Lists)
                .ThenInclude(l => l.Contents)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var sortedLists = user.Lists
                .OrderBy(l => l.CreateDate)
                .ToList();

            foreach (var list in sortedLists)
            {
                list.Contents = list.Contents
                    .OrderBy(c => c.CreateDate)
                    .ToList();
            }

            return sortedLists.AsQueryable();
        }


        public async Task<Note> CreateNote(CreateNoteRequest note)
        {
            try
            {
                var userId = await _userService.GetUserIdByToken();

                var newNote = new Note
                {
                    Id = Guid.NewGuid(),
                    Title = note.Title,
                    CreateDate = DateTime.UtcNow,
                    Description = note.Description,
                    UserId = userId
                };

                _noteContext.Notes.Add(newNote);
                await _noteContext.SaveChangesAsync();

                return newNote;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return null;
        }

        public async Task<NoteList> CreateList(CreateListRequest list)
        {
            var userId = await _userService.GetUserIdByToken();


            var millisecondsCounter = 0;

            var newList = new NoteList
            {
                Id = Guid.NewGuid(),
                Title = list.Title,
                UserId = userId,
                CreateDate = DateTime.UtcNow,
                Contents = list.Contents.Select(item => new ListContent
                {
                    Id = Guid.NewGuid(),
                    Text = item.Text,
                    CreateDate = DateTime.UtcNow.AddMilliseconds(millisecondsCounter += 10),
                    IsChecked = false
                }).ToList()
            };

            await _noteContext.Lists.AddAsync(newList);
            await _noteContext.SaveChangesAsync();

            return newList;
        }


        public async Task<ListContent> CheckListItem(CheckListRequest request)
        {
            var listContent = await _noteContext.ListContents
                    .FirstOrDefaultAsync(lc => lc.Id == request.Id);

            listContent.IsChecked = !listContent.IsChecked;

            await _noteContext.SaveChangesAsync();

            return listContent;
        }

        public async Task<Note> UpdateNote(Note note)
        {
            var selectedNote = await _noteContext.Notes
                .FirstOrDefaultAsync(n => n.Id == note.Id);

            selectedNote.Title = note.Title;
            selectedNote.Description = note.Description;

            await _noteContext.SaveChangesAsync();

            return selectedNote;
        }

        public async Task<NoteList> UpdateList(NoteList list)
        {
            var selectedList = await _noteContext.Lists
                .Include(l => l.Contents)
                .FirstOrDefaultAsync(l => l.Id == list.Id);

            if (selectedList == null)
            {
                throw new Exception("List not found");
            }

            selectedList.Title = list.Title;

            var existingContentIds = selectedList.Contents.Select(c => c.Id).ToList();

            foreach (var content in list.Contents)
            {
                if (content.Id == null || content.Id == Guid.Empty)
                {
                    content.Id = Guid.NewGuid();
                    content.CreateDate = DateTime.UtcNow;
                    content.NoteListId = selectedList.Id;
                    selectedList.Contents.Add(content);
                    await _noteContext.ListContents.AddAsync(content);
                }
                else
                {
                    var existingContent = selectedList.Contents.FirstOrDefault(c => c.Id == content.Id);

                    if (existingContent != null)
                    {
                        existingContent.Text = content.Text;
                        existingContent.IsChecked = content.IsChecked;
                        existingContentIds.Remove(content.Id);
                    }
                }
            }

            foreach (var id in existingContentIds)
            {
                var contentToRemove = selectedList.Contents.FirstOrDefault(c => c.Id == id);
                if (contentToRemove != null)
                {
                    selectedList.Contents.Remove(contentToRemove);
                }
            }

            await _noteContext.SaveChangesAsync();

            return selectedList;
        }






        public async Task<Note> DeleteNote(Guid id)
        {
            var note = await _noteContext.Notes
                .FirstOrDefaultAsync(n => n.Id == id);

            if (note != null)
            {
                _noteContext.Notes.Remove(note);
                await _noteContext.SaveChangesAsync();
            }

            return note;
        }

        public async Task<NoteList> DeleteList(Guid id)
        {
            var list = await _noteContext.Lists
                .Include(l => l.Contents)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (list != null)
            {
                _noteContext.Lists.Remove(list);
                await _noteContext.SaveChangesAsync();
            }

            return list;
        }
    }
}
