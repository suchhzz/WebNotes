
namespace TokenOperations
{
    public interface IPasswordHasher
    {
        Task<string> Generate(string password);
        Task<bool> Verify(string password, string hashedPassword);
    }
}