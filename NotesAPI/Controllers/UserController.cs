using Microsoft.AspNetCore.Mvc;
using NotesEntities;

namespace NotesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly List<User> _users;
        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
            _users = new List<User>();
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username,
                Password = request.Password,
                Notes = new List<Note>()
            };

            _users.Add(user);

            _logger.LogInformation("registered new user, id: " + user.Id);

            return Ok(user);
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Username == request.Username);

            if (user.Password != request.Password)
            {
                return Unauthorized("user was not found");
            }

            return Ok(user);
        }
    }
}
