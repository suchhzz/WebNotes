using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesEntities
{
    public class ListContent
    {
        [Key]
        public Guid? Id { get; set; }
        public string Text { get; set; }
        public bool? IsChecked { get; set; }
        public DateTime? CreateDate { get; set; }
        [ForeignKey(nameof(NoteList))]
        public Guid? NoteListId { get; set; }
    }
}
