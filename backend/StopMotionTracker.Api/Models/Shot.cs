namespace StopMotionTracker.Api.Models;

public enum ShotStatus
{
    NotStarted,
    SetBuild,
    Shooting,
    Editing,
    SoundDesign,
    Done
}

public class Shot
{
    public int Id { get; set; }
    public string SceneNumber { get; set; } = string.Empty;
    public string ShotNumber { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ShotStatus Status { get; set; } = ShotStatus.NotStarted;
    public string? AssignedAnimator { get; set; }
    public string? SoundNotes { get; set; }
    public int? FrameCount { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
