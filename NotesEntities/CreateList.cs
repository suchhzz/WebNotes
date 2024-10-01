using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesEntities
{
    public class CreateList
    {
        public string Title { get; set; }
        public List<ListContent> Contents { get; set; }
    }
}
