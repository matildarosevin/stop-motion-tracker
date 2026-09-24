# 🎬 Stop-Motion Production Tracker

**What it does:** A full-stack web app for tracking every shot in a stop-motion production, from set build through to sound design.

**Tech stack:** React 19 · TypeScript · Vite · ASP.NET Core 8 (C#) · Entity Framework Core · SQLite

**Status:** In progress. Core create/read features are working; see [Next steps](#next-steps).

---

## Why I built this

I wanted a portfolio project that brought together the React/TypeScript and .NET stack to be used in stop motion processes. Rather than build another to-do app, I modelled something that might be similar to a production workflow.

## What I learned

- **Keeping the frontend and backend in sync.** The `Shot` model is defined once in C# and mirrored exactly as a TypeScript interface, so the compiler catches mismatches on both sides.
- **How the pieces talk to each other.** Building the API controller, the `api.ts` fetch layer and the CORS setup showed me the full journey of a request from browser to database and back.
- **Choosing tools for the environment.** I started with SQL Server, then switched to SQLite so the project runs on a Mac, as I have an M1 silicone chip, with no extra setup.

---

## Getting started

You'll need the [.NET 8 SDK](https://dotnet.microsoft.com/download), [Node.js](https://nodejs.org/) and the EF Core CLI (`dotnet tool install --global dotnet-ef`).

**1. Clone the repo**

```bash
git clone https://github.com/matildarosevin/stop-motion-tracker.git
cd stop-motion-tracker
```

**2. Start the backend** (in one terminal)

```bash
cd backend/StopMotionTracker.Api
dotnet restore
dotnet ef database update
dotnet run
```

The API runs at `http://localhost:5000`, with Swagger docs at `http://localhost:5000/swagger`.

**3. Start the frontend** (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`.

---

## How it works

Each shot has a scene, shot number, and progress status:

```
NotStarted → SetBuild → Shooting → Editing → SoundDesign → Done
```

**Backend.** An ASP.NET Core Web API exposes REST endpoints for shots (`GET`, `POST`, `PUT`, `DELETE` on `/api/shots`). Entity Framework Core maps the `Shot` model to a SQLite database, and shots are returned sorted by scene, then shot number. Scene and shot numbers are treated as identifiers, so updates change a shot's status, animator, notes and frame count but never its number.

**Frontend.** A React + TypeScript app built with Vite. All HTTP calls live in a separate `api.ts` file, so components only deal with data rather than fetch logic. The main view shows an "add shot" form and a table of every shot, with colour-coded status badges.

### Project structure

```
stopmotion-tracker/
├── frontend/                    # React + TypeScript (Vite)
│   └── src/
│       ├── App.tsx              # Main UI: add-shot form and shot table
│       ├── api.ts               # All requests to the backend
│       └── types.ts             # Shot type, mirrors the C# model
└── backend/
    └── StopMotionTracker.Api/   # ASP.NET Core Web API
        ├── Controllers/         # ShotsController (CRUD endpoints)
        ├── Models/              # Shot model and ShotStatus enum
        ├── Data/                # EF Core database context
        └── Migrations/
```

---

## Challenges & solutions

**Running SQL Server on a Mac**
- *Challenge:* SQL Server needed a Docker container and extra configuration just to run locally.
- *Solution:* Switched to SQLite through EF Core. Because EF Core abstracts the database, the change was mostly one line in `Program.cs` and a connection string.

**Connecting the frontend to the API**
- *Challenge:* The browser blocked requests from the React dev server to the API.
- *Solution:* Added a CORS policy in `Program.cs` that allows requests from the Vite dev server (`localhost:5173`).

**Known issue: creating a shot returns a 400 error**
- *Challenge:* The frontend sends the status as a string (`"NotStarted"`), but ASP.NET Core expects enums as numbers by default, so the `POST` request fails validation.
- *Solution:* Register `JsonStringEnumConverter` on the controllers' JSON options in `Program.cs` so enums are read and written as strings.

---

## Next steps

- [ ] Update a shot's status by dragging it between pipeline columns
- [ ] Assign animators and edit shots from the UI
- [ ] Filter and sort by scene, status or animator
- [ ] Attach reference images to each shot
- [ ] Real-time updates so a whole team can see changes live
- [ ] Authentication for multi-user access
- [ ] Deploy with a CI/CD pipeline