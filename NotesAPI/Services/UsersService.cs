using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NoteDataAccess;
using NotesAPI.Abstractions;
using NotesEntities;
using System.IdentityModel.Tokens.Jwt;
using TokenOperations;

namespace NotesAPI.Services
{
    public class UsersService : IUsersService
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly NotesDbContext _noteContext;
        private readonly IJwtProvider _jwtProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsersService(IPasswordHasher passwordHasher, 
            NotesDbContext noteContext, 
            IJwtProvider jwtProvider, 
            IHttpContextAccessor httpContextAccessor)
        {
            _passwordHasher = passwordHasher;
            _noteContext = noteContext;
            _jwtProvider = jwtProvider;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<bool> Register(string username, string password)
        {
            var existingUser = await _noteContext.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            if (existingUser != null)
            {
                return false;
            }

            var hashedPassword = await _passwordHasher.Generate(password);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = username,
                HashedPassword = hashedPassword,
                Notes = new List<Note>(),
                Lists = new List<NoteList>()
            };

            await _noteContext.Users.AddAsync(user);
            await _noteContext.SaveChangesAsync();

            return true;
        }

        public async Task<(string, User)> Login(string username, string password)
        {
            var existingUser = await _noteContext.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            var result = await _passwordHasher.Verify(password, existingUser.HashedPassword);

            if (!result)
            {
                throw new Exception("failed to log in");
            }

            var token = await _jwtProvider.GenerateToken(existingUser);

            return (token, existingUser);
        }

        public async Task<User> GetUserById(Guid id)
        {
            var user = await _noteContext.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<Guid> GetUserIdByToken()
        {
            var token = _httpContextAccessor.HttpContext.Request.Cookies["jwt"];

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(token) as JwtSecurityToken;

            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId").Value;

            return Guid.Parse(userId);
        }
    }
}
