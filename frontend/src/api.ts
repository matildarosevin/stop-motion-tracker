//this is how the frontend talks to the backend 


import type { Shot } from "./types";

// Points at the ASP.NET Core Web API (see /backend). I'll need to update if I change the port. 
const API_BASE_URL = "http://localhost:5000/api";

export async function getShots(): Promise<Shot[]> {
  const res = await fetch(`${API_BASE_URL}/shots`);
  if (!res.ok) throw new Error("Failed to load shots");
  return res.json();
}

export async function createShot(shot: Partial<Shot>): Promise<Shot> {
  const res = await fetch(`${API_BASE_URL}/shots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shot),
  });
  if (!res.ok) throw new Error("Failed to create shot");
  return res.json();
}

export async function updateShot(id: number, shot: Partial<Shot>): Promise<Shot> {
  const res = await fetch(`${API_BASE_URL}/shots/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shot),
  });
  if (!res.ok) throw new Error("Failed to update shot");
  return res.json();
}
