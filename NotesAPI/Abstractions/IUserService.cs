using NotesEntities;

namespace NotesAPI.Abstractions
{
    public interface IUserService
    {
        Task Register(string username, string password);
        Task<string> Login(string username, string password);
        Task<User> GetUserById(Guid id);
    }
}