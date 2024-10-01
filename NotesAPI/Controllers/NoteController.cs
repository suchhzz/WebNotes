using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesAPI.Services;
using NotesEntities;


namespace NotesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly ILogger<NoteController> _logger;
        private readonly INotesService _notesService;
        public NoteController(INotesService notesService, ILogger<NoteController> logger)
        {
            _logger = logger;
            _notesService = notesService;
        }

        [HttpGet("/notes")]
        public async Task<IActionResult> GetNotes()
        {
            var notes = await _notesService.GetNotes();

            return Ok(notes);
        }

        [HttpGet("/lists")]
        public async Task<IActionResult> GetLists()
        {
            var lists = await _notesService.GetLists();

            return Ok(lists);
        }

        [HttpGet("/notes/{id}")]
        public async Task<IActionResult> GetNoteById(Guid id)
        {
            var note = await _notesService.GetNoteById(id);

            if (note == null)
            {
                return BadRequest("Incorrect id");
            }

            return Ok(note);
        }

        [HttpPost("/notes/create")]
        public async Task<IActionResult> CreateNote([FromBody] CreateNote note)
        {
            var createdNote = await _notesService.CreateNote(note);

            return Ok(createdNote);
        }

        [HttpPost("/lists/create")]
        public async Task<IActionResult> CreateList([FromBody] CreateList list)
        {
            var createdList = await _notesService.CreateList(list);

            return Ok(createdList);
        }

        [HttpPut("/notes/update/{id}")]
        public async Task <IActionResult> UpdateNote([FromBody] Note note, Guid id)
        {
            if (note.Id != id) 
            {
                return BadRequest("incorrect id");
            }


            var updatedNote = await _notesService.UpdateNote(note);

            return Ok(updatedNote);
        }

        [HttpDelete("/notes/delete/{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var deletedNote = await _notesService.DeleteNote(id);

            return Ok(deletedNote);
        }

        [HttpDelete("/lists/delete/{id}")]
        public async Task<IActionResult> DeleteList(Guid id)
        {
            var deletedList = await _notesService.DeleteList(id);

            return Ok(deletedList);
        }
    }
}
