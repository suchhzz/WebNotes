using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesEntities.Operations
{
    public class CreateListRequest
    {
        public string Title { get; set; }
        public List<CreateListContentRequest> Contents { get; set; }
    }
}
