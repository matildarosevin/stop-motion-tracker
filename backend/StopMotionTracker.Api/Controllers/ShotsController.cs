//this is how the backend recieves requests and saves data. When an HTTP request comes in, this is what decides what to do with it 


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StopMotionTracker.Api.Data;
using StopMotionTracker.Api.Models;

namespace StopMotionTracker.Api.Controllers;

[ApiController] //This handles API (Application Programme Interface) requests (HTTP requests) 
[Route("api/[controller]")] //URL path
public class ShotsController : ControllerBase
{
    private readonly AppDbContext _db; //database connection 

    public ShotsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet] //CRUD retrieve all shots 
    public async Task<ActionResult<IEnumerable<Shot>>> GetShots()
    {
        return await _db.Shots.OrderBy(s => s.SceneNumber).ThenBy(s => s.ShotNumber).ToListAsync(); //Async (do other things while retrieving as a list)
    }

    [HttpGet("{id}")] //get a specific shot i.e. Get shot 5, retrieves shot 5 
    public async Task<ActionResult<Shot>> GetShot(int id)
    {
        var shot = await _db.Shots.FindAsync(id);
        if (shot is null) return NotFound(); //return error if shot not found 
        return shot; //return shot as JSON
    }

    [HttpPost] //create a new shot
    public async Task<ActionResult<Shot>> CreateShot(Shot shot)
    {
        shot.UpdatedAt = DateTime.UtcNow; //set time stamp to now
        _db.Shots.Add(shot); //add shot to db
        await _db.SaveChangesAsync(); //save changes
        return CreatedAtAction(nameof(GetShot), new { id = shot.Id }, shot); //return with status 201
    }

    [HttpPut("{id}")] //update existing shot 
    public async Task<IActionResult> UpdateShot(int id, Shot updated)
    {
        var shot = await _db.Shots.FindAsync(id);
        if (shot is null) return NotFound(); //return 404 if not found

        shot.Status = updated.Status;
        shot.AssignedAnimator = updated.AssignedAnimator;
        shot.SoundNotes = updated.SoundNotes;
        shot.FrameCount = updated.FrameCount;
        shot.Description = updated.Description;
        shot.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(shot); //note not to change scene numver or shot number, as these are identifiers 
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShot(int id)
    {
        var shot = await _db.Shots.FindAsync(id);
        if (shot is null) return NotFound();

        _db.Shots.Remove(shot);
        await _db.SaveChangesAsync();
        return NoContent(); //remove a shot
    }
}
