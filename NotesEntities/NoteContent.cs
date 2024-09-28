﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesEntities
{
    public class NoteContent
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public bool IsChecked { get; set; }
        public DateOnly CreateDate { get; set; }    
    }
}
