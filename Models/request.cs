public class Request
{
    public string Question { get; set; }

    public Request(string question)
    {
        Question = question;
    }
}

public class Question
{
    public required string Text { get; set; }
    public required string UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string Id { get; set; } = Guid.NewGuid().ToString();

}