using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace readthedocs.Controllers;

[ApiController]
[Route("auth/[controller]")]
public class LoginController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly AuthService _authService;

    public LoginController(UserManager<User> userManager, SignInManager<User> signInManager, AuthService authService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _authService = authService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
        {
            return BadRequest("Invalid login request.");
        }

        var user = await _userManager.FindByNameAsync(loginRequest.Username);
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        var result = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, false, false);
        if (!result.Succeeded)
        {
            return Unauthorized("Invalid credentials.");
        }

        var token = _authService.GenerateToken(user);
        return Ok(new { Token = token });
    }
}


[ApiController]
[Route("auth/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly AuthService _authService;



    public RegisterController(UserManager<User> userManager, AuthService authService)
    {
        _userManager = userManager;
        _authService = authService;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
        {
            Console.WriteLine(request);
            return BadRequest("Invalid registration request.");
        }

        var user = new User(request.Username, request.Email)
        {
            UserName = request.Username,
        };
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            Console.WriteLine("errors\n");
            foreach (var error in result.Errors)
            {
                Console.WriteLine($"{error.Code}: {error.Description}");
            }
            return BadRequest(result.Errors);
        }
        var token = _authService.GenerateToken(user);

        return Ok(new { Token = token });
    }
}
