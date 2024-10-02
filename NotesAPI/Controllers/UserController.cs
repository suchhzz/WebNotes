﻿using Microsoft.AspNetCore.Mvc;
using NotesAPI.Abstractions;
using NotesEntities;
using System.IdentityModel.Tokens.Jwt;

namespace NotesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly List<User> _users;
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserController(ILogger<UserController> logger, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;
            _users = new List<User>();
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

            var existingUser = _users.FirstOrDefault(u => u.Username == request.Username);

            if (existingUser != null)
            {
                return Unauthorized();
            }

            await _userService.Register(request.Username, request.Password);
            var token = await _userService.Login(request.Username, request.Password);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            };

            _httpContextAccessor.HttpContext.Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok("registered");
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        {
            var token = await _userService.Login(request.Username, request.Password);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            };


            _httpContextAccessor.HttpContext.Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok();
        }

        [HttpGet("/users")]
        public async Task<IActionResult> GetUser()
        {
            var token = _httpContextAccessor.HttpContext.Request.Cookies["jwt"];

            if (token == null)
            {
                return Unauthorized();
            }

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(token) as JwtSecurityToken;

            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId");

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var user = await _userService.GetUserById(Guid.Parse(userIdClaim.Value));

            return Ok(user);
        }
    }
}
