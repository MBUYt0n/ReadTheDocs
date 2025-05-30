using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace readthedocs.Controllers;

[ApiController]
[Route("api")]
public class AskController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly ILogger<AskController> _logger;


    public AskController(ApplicationDbContext db, ILogger<AskController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpPost("ask")]
    [Authorize]
    public IActionResult Ask([FromBody] Request request)
    {
        if (string.IsNullOrWhiteSpace(request.Question))
        {
            return BadRequest("Question cannot be empty.");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User identifier not found.");
        }

        var question = new Question
        {
            Text = request.Question,
            UserId = userId
        };

        _db.Questions.Add(question);
        _db.SaveChanges();

        var answer = $"You asked: {request.Question}";

        return Ok(new { answer });
    }

    [HttpGet("history")]
    [Authorize]
    public IActionResult AskHistory()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User identifier not found.");
        }

        var questions = _db.Questions
            .Where(q => q.UserId == userId)
            .OrderByDescending(q => q.CreatedAt)
            .ToList();
        _logger.LogInformation("Questions count: {Count}", questions.Count); 
        return Ok(new { questions });
    }
}