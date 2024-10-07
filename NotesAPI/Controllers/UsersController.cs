using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesAPI.Abstractions;
using NotesEntities;
using NotesEntities.Authorization;
using System.IdentityModel.Tokens.Jwt;

namespace NotesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUsersService _userService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsersController(ILogger<UsersController> logger, IUsersService userService, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Invalid input");
            }

            if (request.Password != request.PasswordConfirm)
            {
                return Unauthorized("Incorrect passwords");
            }

            var registerResult = await _userService.Register(request.Username, request.Password);

            if (!registerResult)
            {
                return Unauthorized();
            }

            var loginCortage = await _userService.Login(request.Username, request.Password);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            };

            var token = loginCortage.Item1;

            _httpContextAccessor.HttpContext.Response.Cookies.Append("jwt", token, cookieOptions);

            var user = loginCortage.Item2;

            return Ok(user);
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        {
            var loginCortage = await _userService.Login(request.Username, request.Password);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            };

            var token = loginCortage.Item1;

            _httpContextAccessor.HttpContext.Response.Cookies.Append("jwt", token, cookieOptions);

            var user = loginCortage.Item2;

            return Ok(user);
        }

        [Authorize]
        [HttpGet("/users")]
        public async Task<IActionResult> GetUser()
        {
            var tokenFromCookie = _httpContextAccessor.HttpContext.Request.Cookies["jwt"];

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(tokenFromCookie) as JwtSecurityToken;

            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId");

            var user = await _userService.GetUserById(Guid.Parse(userIdClaim.Value));

            return Ok(user);
        }
    }
}
