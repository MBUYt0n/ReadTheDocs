using Microsoft.AspNetCore.Identity;
public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }

    public LoginRequest(string username, string password)
    {
        Username = username;
        Password = password;
    }
}

public class RegisterRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }

    public RegisterRequest(string username, string password, string email)
    {
        Username = username;
        Password = password;
        Email = email;
    }
}
public class User : IdentityUser
{
    public User(string userName, string fullName, string email)
        : base(userName)
    {
        Email = email;
    }
}