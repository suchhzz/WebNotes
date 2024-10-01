using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesEntities
{
    public class ListContent
    {
        public Guid? Id { get; set; }
        public string Text { get; set; }
        public bool IsChecked { get; set; } = false;
    }
}
