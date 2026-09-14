//This file defines what a shot is, and what properties it can have, and has to have
//Like a blueprint 

namespace StopMotionTracker.Api.Models;

public enum ShotStatus //a shot can ONLY have one of these. 
{
    NotStarted,
    SetBuild,
    Shooting,
    Editing,
    SoundDesign,
    Done
}

public class Shot //features a shot can or should have 
{
    public int Id { get; set; }
    public string SceneNumber { get; set; } = string.Empty;
    public string ShotNumber { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ShotStatus Status { get; set; } = ShotStatus.NotStarted; //a shot is immediately set as notstarted if a status is not given
    public string? AssignedAnimator { get; set; } // ? means this feature is optional (maybe an animator hasn't been assigned yet)
    public string? SoundNotes { get; set; }
    public int? FrameCount { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
