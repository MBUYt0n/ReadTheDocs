using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace readthedocs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AskController : ControllerBase
{
    [HttpPost]
    [Authorize]
    public IActionResult Ask([FromBody] Request request)
    {
        if (string.IsNullOrWhiteSpace(request.Question))
        {
            return BadRequest("Question cannot be empty.");
        }

        var answer = $"You asked: {request.Question}";

        return Ok(answer);
    }
}
