using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesEntities
{
    public class Note
    {
        [Key]
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? CreateDate { get; set; }
        [ForeignKey(nameof(User))]
        public Guid? UserId { get; set; }
    }
}