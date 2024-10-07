using NotesEntities;

namespace TokenOperations
{
    public interface IJwtProvider
    {
        Task<string> GenerateToken(User user);
    }
}