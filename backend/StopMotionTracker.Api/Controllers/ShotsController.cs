using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StopMotionTracker.Api.Data;
using StopMotionTracker.Api.Models;

namespace StopMotionTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShotsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ShotsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Shot>>> GetShots()
    {
        return await _db.Shots.OrderBy(s => s.SceneNumber).ThenBy(s => s.ShotNumber).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Shot>> GetShot(int id)
    {
        var shot = await _db.Shots.FindAsync(id);
        if (shot is null) return NotFound();
        return shot;
    }

    [HttpPost]
    public async Task<ActionResult<Shot>> CreateShot(Shot shot)
    {
        shot.UpdatedAt = DateTime.UtcNow;
        _db.Shots.Add(shot);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetShot), new { id = shot.Id }, shot);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateShot(int id, Shot updated)
    {
        var shot = await _db.Shots.FindAsync(id);
        if (shot is null) return NotFound();

        shot.Status = updated.Status;
        shot.AssignedAnimator = updated.AssignedAnimator;
        shot.SoundNotes = updated.SoundNotes;
        shot.FrameCount = updated.FrameCount;
        shot.Description = updated.Description;
        shot.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(shot);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShot(int id)
    {
        var shot = await _db.Shots.FindAsync(id);
        if (shot is null) return NotFound();

        _db.Shots.Remove(shot);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
