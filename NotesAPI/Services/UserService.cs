using Microsoft.AspNetCore.Identity;
using NoteDataAccess;
using NotesAPI.Abstractions;
using NotesEntities;
using TokenOperations;

namespace NotesAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly INoteContext _noteContext;
        private readonly IJwtProvider _jwtProvider;

        public UserService(IPasswordHasher passwordHasher, INoteContext noteContext, IJwtProvider jwtProvider)
        {
            _passwordHasher = passwordHasher;
            _noteContext = noteContext;
            _jwtProvider = jwtProvider;
        }

        public async Task Register(string username, string password)
        {
            var hashedPassword = await _passwordHasher.Generate(password);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = username,
                HashedPassword = hashedPassword,
                Notes = new List<Note>(),
                Lists = new List<NoteList>()
            };

            await _noteContext.AddUser(user);
        }

        public async Task<string> Login(string username, string password)
        {
            var existingUser = await _noteContext.GetUserByUsername(username);

            var result = await _passwordHasher.Verify(password, existingUser.HashedPassword);

            if (!result)
            {
                throw new Exception("failed to log in");
            }

            var token = await _jwtProvider.GenerateToken(existingUser);

            return token;
        }
    }
}
