using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesEntities
{
    public class NoteList
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool IsPinned { get; set; }
        public List<ListContent> Contents { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
