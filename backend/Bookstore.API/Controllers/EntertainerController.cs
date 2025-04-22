using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bookstore.Data; // <- Update this if your namespace changes

namespace OnlineBookstore.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EntertainerController : Controller
{
    private EntertainmentAgencyExampleContext _context;

    public EntertainerController(EntertainmentAgencyExampleContext context)
    {
        _context = context;
    }

    // GET: api/entertainer
    [HttpGet]
    public IActionResult GetEntertainers()
    {
        var entertainers = _context.Entertainers
            .Select(e => new
            {
                e.EntertainerId,
                e.EntStageName,
                BookingCount = _context.Engagements.Count(en => en.EntertainerId == e.EntertainerId),
                LastBookingDate = _context.Engagements
                    .Where(en => en.EntertainerId == e.EntertainerId)
                    .OrderByDescending(en => en.StartDate)
                    .Select(en => en.StartDate)
                    .FirstOrDefault()
            })
            .ToList();

        return Ok(entertainers);
    }

    // GET: api/entertainer/5
    [HttpGet("{id}")]
    public IActionResult GetEntertainer(int id)
    {
        var entertainer = _context.Entertainers.Find(id);
        if (entertainer == null)
        {
            return NotFound(new { message = "Entertainer not found" });
        }

        return Ok(entertainer);
    }

    // POST: api/entertainer/AddEntertainer
    [HttpPost("AddEntertainer")]
    public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
    {
        _context.Entertainers.Add(newEntertainer);
        _context.SaveChanges();
        return Ok(newEntertainer);
    }

    // PUT: api/entertainer/UpdateEntertainer/5
    [HttpPut("UpdateEntertainer/{id}")]
    public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updatedEntertainer)
    {
        var entertainer = _context.Entertainers.Find(id);
        if (entertainer == null)
        {
            return NotFound(new { message = "Entertainer not found" });
        }

        _context.Entry(entertainer).CurrentValues.SetValues(updatedEntertainer);
        _context.SaveChanges();
        return Ok(updatedEntertainer);
    }

    // DELETE: api/entertainer/DeleteEntertainer/5
    [HttpDelete("DeleteEntertainer/{id}")]
    public IActionResult DeleteEntertainer(int id)
    {
        var entertainer = _context.Entertainers.Find(id);
        if (entertainer == null)
        {
            return NotFound(new { message = "Entertainer not found" });
        }

        _context.Entertainers.Remove(entertainer);
        _context.SaveChanges();
        return NoContent();
    }
}
