using Microsoft.AspNetCore.Authorization;
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

public class RegisterController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public RegisterController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest("Invalid registration request.");
        }

        var result = await _userManager.CreateAsync(request, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok("User registered successfully.");
    }
}
