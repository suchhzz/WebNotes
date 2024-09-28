using NotesEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteDataAccess
{
    public class NoteContext : INoteContext
    {
        private readonly List<Note> _notes = new List<Note>
        {
            new Note { Id = Guid.NewGuid(), Title = "note 1", CreateDate = new DateTime(2024, 9, 25, 12, 30, 43), IsPinned = false },
            new Note { Id = Guid.NewGuid(), Title = "note 2", CreateDate = DateTime.Now, IsPinned = false },
            new Note { Id = Guid.NewGuid(), Title = "note 3", CreateDate = new DateTime(2024, 9, 21, 3, 3, 54), IsPinned = true },
            new Note { Id = Guid.NewGuid(), Title = "note 4", CreateDate = new DateTime(2024, 9, 7, 8, 10, 23), IsPinned = true },
            new Note { Id = Guid.NewGuid(), Title = "note 5", CreateDate = new DateTime(2024, 9, 3, 15, 6, 12), IsPinned = false },
        };

        public async Task<IQueryable<Note>> GetNotes()
        {
            return _notes.AsQueryable();
        }

        public async Task<Note> GetNoteById(Guid id)
        {
            var note = _notes.FirstOrDefault(n => n.Id == id);

            return note;
        }

        public async Task<Note> AddNote(Note note)
        {
            _notes.Add(note);

            return note;
        }

        public async Task<Note> DeleteNoteById(Guid id)
        {
            var selectedNote = _notes.FirstOrDefault(n => n.Id == id);

            _notes.Remove(selectedNote);

            return selectedNote;
        }

        public async Task<Note> UpdateNote(Note note)
        {
            var selectedNote = _notes.FirstOrDefault(n => n.Id == note.Id);

            selectedNote.Title = note.Title;
            selectedNote.Contents = note.Contents;
            selectedNote.IsPinned = note.IsPinned;

            return selectedNote;
        }
    }
}
