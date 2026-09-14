# Stop-Motion Production Tracker 🎬

A full-stack app for tracking shots through a stop-motion production — status, assigned
animator, and sound design notes per shot. Built as a personal project to get hands-on
with React/TypeScript + ASP.NET Core + SQL Server, inspired by an interest in both
animation production and sound design.

**Status: In progress.** Core CRUD scaffold is in place; see Roadmap below.

## Stack

- **Frontend:** React + TypeScript (Vite)
- **Backend:** ASP.NET Core Web API (.NET 8)
- **Database:** SQL Server via Entity Framework Core

## Project structure

```
stopmotion-tracker/
├── frontend/     # React + TypeScript app (Vite)
└── backend/
    └── StopMotionTracker.Api/   # ASP.NET Core Web API
```

## Running locally

### Backend

```bash
cd backend/StopMotionTracker.Api
dotnet restore
dotnet ef migrations add InitialCreate   # first time only
dotnet ef database update
dotnet run
```

API runs at `https://localhost:5001`, with Swagger UI at `/swagger`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Roadmap

- [x] Scaffold frontend (Vite + React + TS)
- [x] Scaffold backend (ASP.NET Core Web API + EF Core)
- [x] `Shot` model + CRUD endpoints
- [x] Basic shot list + add-shot form in the UI
- [ ] EF Core migrations + local SQL Server setup
- [ ] Edit/update shot status from the UI (drag between status columns)
- [ ] Filter/sort shots by scene, status, or animator
- [ ] Authentication (Azure Entra ID) for multi-user access
- [ ] Deploy backend + frontend, add CI/CD pipeline (Azure DevOps)
- [ ] Attach reference images per shot

## Why this project

I wanted a portfolio project that combines the React/TypeScript + ASP.NET/.NET stack
with something I'm interested in — stop-motion animation and sound design.
