using Microsoft.AspNetCore.Identity;
public class LoginRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}

public class RegisterRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string Email { get; set; }
}
public class User : IdentityUser
{
    public User(string userName, string email)
        : base(userName)
    {
        Email = email;
    }
}