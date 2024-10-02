﻿using NotesEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace NoteDataAccess
{
    public class NoteContext : INoteContext
    {
        private readonly List<Note> _notes = new List<Note>
        {
            new Note { Id = Guid.NewGuid(), 
                Title = "note 1", 
                Description = "some desc1",
                CreateDate = new DateTime(2024, 9, 25, 12, 30, 43), 
                IsPinned = false },

            new Note { Id = Guid.NewGuid(), 
                Title = "note 2", 
                Description = "some loooooooo oooooo ooooo ooo ooo oooooo oooooooooo oooo oooo oong description",
                CreateDate = DateTime.Now, 
                IsPinned = false },

            new Note { Id = Guid.NewGuid(), 
                Title = "note 3",
                Description = "some desc3",
                CreateDate = new DateTime(2024, 9, 21, 3, 3, 54), 
                IsPinned = true },

            new Note { Id = Guid.NewGuid(), 
                Title = "note 4",
                Description = "some loooo oo o o o o oo o  o o o o o o ongggg desc 2",
                CreateDate = new DateTime(2024, 9, 7, 8, 10, 23), 
                IsPinned = true },

            new Note { Id = Guid.NewGuid(), 
                Title = "note 5",
                Description = "some dedsadas dsasc2",
                CreateDate = new DateTime(2024, 9, 3, 15, 6, 12), 
                IsPinned = false },
        };

        private readonly List<NoteList> _noteLists = new List<NoteList>
        {
            new NoteList { Id = Guid.NewGuid(), Title = "list 1", CreateDate = new DateTime(2023, 5, 2, 7, 54, 21), IsPinned = false,
            Contents = new List<ListContent> {
                new ListContent { Id = Guid.NewGuid(), IsChecked = false, Text = "content 1" },
                new ListContent { Id = Guid.NewGuid(), IsChecked = false, Text = "content 2" },
                new ListContent { Id = Guid.NewGuid(), IsChecked = true, Text = "content 3" },
            }},

            new NoteList { Id = Guid.NewGuid(), Title = "list 2", CreateDate = new DateTime(2021, 5, 6, 3, 1, 56), IsPinned = false,
            Contents = new List<ListContent> {
                new ListContent { Id = Guid.NewGuid(), IsChecked = true, Text = "content 1" },
                new ListContent { Id = Guid.NewGuid(), IsChecked = true, Text = "content 2" }
            }}
        };

        private readonly List<User> _users;
        public NoteContext()
        {
            _users = new List<User>();

            _users.Add(new User
            {
                Id = Guid.NewGuid(),
                Username = "alex",
                HashedPassword = "123",
                Notes = _notes,
                Lists = _noteLists
            });
        }
        public async Task<ListContent> CheckList(Guid id, string text)
        {
            var content = _noteLists.SelectMany(c => c.Contents)
                .FirstOrDefault(c => c.Id == id && c.Text == text);

            content.IsChecked = !content.IsChecked;

            return content;
        }
        public async Task<IQueryable<Note>> GetNotes()
        {
            return _notes.AsQueryable();
        }

        public async Task<IQueryable<NoteList>> GetLists()
        {
            return _noteLists.AsQueryable();
        }

        public async Task<Note> GetNoteById(Guid id)
        {
            var note = _notes.FirstOrDefault(n => n.Id == id);

            return note;
        }

        public async Task<NoteList> GetListById(Guid id)
        {
            var noteList = _noteLists.FirstOrDefault(l => l.Id == id);

            return noteList;
        }

        public async Task<Note> AddNote(Note note)
        {
            _notes.Add(note);

            return note;
        }

        public async Task<NoteList> AddList(NoteList list)
        {
            _noteLists.Add(list);

            return list;
        }

    public async Task<Note> DeleteNoteById(Guid id)
        {
            var selectedNote = _notes.FirstOrDefault(n => n.Id == id);

            _notes.Remove(selectedNote);

            return selectedNote;
        }

        public async Task<NoteList> DeleteListById(Guid id)
        {
            var selectedList = _noteLists.FirstOrDefault(l => l.Id == id);

            _noteLists.Remove(selectedList);

            return selectedList;
        }

        public async Task<Note> UpdateNote(Note note)
        {
            var selectedNote = _notes.FirstOrDefault(n => n.Id == note.Id);

            selectedNote.Title = note.Title;
            selectedNote.IsPinned = note.IsPinned;

            return selectedNote;
        }

        public async Task<User> AddUser(User user)
        {
            _users.Add(user);

            return user;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            var user = _users.FirstOrDefault(u => u.Username == username);

            return user;
        }

        public async Task<User> GetUserById(Guid id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);

            return user;
        }
    }
}
