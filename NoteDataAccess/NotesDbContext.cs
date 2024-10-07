using Microsoft.EntityFrameworkCore;
using NotesEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace NoteDataAccess
{
    public class NotesDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<NoteList> Lists { get; set; }
        public DbSet<ListContent> ListContents { get; set; }

        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options) { }
    }
}
