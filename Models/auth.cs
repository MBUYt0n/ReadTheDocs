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

public class User : IdentityUser
{
    public string FullName { get; set; }

    public User(string userName, string fullName, string email)
        : base(userName)
    {
        FullName = fullName;
        Email = email;
    }
}