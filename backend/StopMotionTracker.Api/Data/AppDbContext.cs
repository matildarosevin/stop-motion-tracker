using Microsoft.EntityFrameworkCore;
using StopMotionTracker.Api.Models;

namespace StopMotionTracker.Api.Data;

public class AppDbContext : DbContext //initialise class Db
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Shot> Shots => Set<Shot>();
}
