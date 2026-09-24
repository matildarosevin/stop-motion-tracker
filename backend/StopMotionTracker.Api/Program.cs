//ASP.NET core configuration 

using Microsoft.EntityFrameworkCore; //Why use Entity? Write C#, type-safe, switch databases, reads like english, less code
using StopMotionTracker.Api.Data;

var builder = WebApplication.CreateBuilder(args); //ASP.NET core framework, creates service container

//Register services Dependency Injections.
builder.Services.AddControllers(); //Register Controllers
builder.Services.AddEndpointsApiExplorer(); //API Endpoints 
builder.Services.AddSwaggerGen(); //Website for documenting my API's 

//Register DbContext 
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); //Which Database to use
 //Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Vite dev server
              .AllowAnyHeader()
              .AllowAnyMethod();  //Allows frontend to call to backend, frontend can use any HTTP verb
    });
});

//Build the application
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); //Middleware pipeline
} 

// app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers(); //Wire up controller users

app.Run();
