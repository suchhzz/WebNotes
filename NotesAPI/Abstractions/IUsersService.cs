using NotesEntities;

namespace NotesAPI.Abstractions
{
    public interface IUsersService
    {
        Task<bool> Register(string username, string password);
        Task<(string, User)> Login(string username, string password);
        Task<User> GetUserById(Guid id);
        Task<Guid> GetUserIdByToken();
    }
}