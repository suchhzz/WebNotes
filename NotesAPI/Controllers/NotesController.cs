using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesAPI.Services;
using NotesEntities;
using NotesEntities.Operations;
using System.IdentityModel.Tokens.Jwt;


namespace NotesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly ILogger<NotesController> _logger;
        private readonly INotesService _notesService;
        public NotesController(INotesService notesService, ILogger<NotesController> logger)
        {
            _logger = logger;
            _notesService = notesService;
        }

        [Authorize]
        [HttpGet("/notes")]
        public async Task<IActionResult> GetNotes()
        {
            var userNotes = await _notesService.GetNotes();

            if (userNotes == null)
            {
                return BadRequest();
            }

            return Ok(userNotes);

        }

        [Authorize]
        [HttpGet("/lists")]
        public async Task<IActionResult> GetLists()
        {
            var userLists = await _notesService.GetLists();

            if (userLists == null)
            {
                return BadRequest();
            }

            return Ok(userLists);
        }

        [Authorize]
        [HttpPost("/notes/create")]
        public async Task<IActionResult> CreateNote([FromBody] CreateNoteRequest note)
        {
            var createdNote = await _notesService.CreateNote(note);

            if (createdNote == null)
            {
                return BadRequest();
            }

            return Ok(createdNote);
        }

        [Authorize]
        [HttpPost("/lists/create")]
        public async Task<IActionResult> CreateList([FromBody] CreateListRequest list)
        {
            var createdList = await _notesService.CreateList(list);

            if (createdList == null)
            {
                return BadRequest();
            }

            return Ok(createdList);
        }

        [Authorize]
        [HttpPut("/lists/check")]
        public async Task<IActionResult> CheckListItem([FromBody] CheckListRequest request)
        {
            var checkedList = await _notesService.CheckListItem(request);

            if (checkedList == null)
            {
                return BadRequest();
            }

            return Ok(checkedList);
        }

        [Authorize]
        [HttpPut("/notes/update/{id}")]
        public async Task <IActionResult> UpdateNote([FromBody] Note note, Guid id)
        {
            if (note.Id != id) 
            {
                return BadRequest("incorrect id");
            }

            var updatedNote = await _notesService.UpdateNote(note);

            if (updatedNote == null)
            {
                return BadRequest();
            }

            return Ok(updatedNote);
        }

        [Authorize]
        [HttpPut("/lists/update/{id}")]
        public async Task<IActionResult> UpdateList([FromBody] NoteList list, Guid id)
        {
            if (list.Id != id)
            {

                return BadRequest("incorrect id");
            }

            var updatedList = await _notesService.UpdateList(list);

            if (updatedList == null)
            {
                return BadRequest();
            }

            return Ok(updatedList);
        }

        [Authorize]
        [HttpDelete("/notes/delete/{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var deletedNote = await _notesService.DeleteNote(id);

            if (deletedNote == null)
            {
                return BadRequest();
            }

            return Ok(deletedNote);
        }

        [Authorize]
        [HttpDelete("/lists/delete/{id}")]
        public async Task<IActionResult> DeleteList(Guid id)
        {
            var deletedList = await _notesService.DeleteList(id);

            if (deletedList == null)
            {
                return BadRequest();
            }

            return Ok(deletedList);
        }
    }
}
