//this is how the frontend talks to the backend 
//HTTP Layer - kept separate for readability 

import type { Shot } from "./types";

// Points at the ASP.NET Core Web API (see /backend). I'll need to update if I change the port. 
const API_BASE_URL = "http://localhost:5000/api"; //Requests go here, Base URL, regular connection (not secure), on my computer. In production, this would be https://myapp.com/api

export async function getShots(): Promise<Shot[]> { //GET an array of Shot Objects 
  const res = await fetch(`${API_BASE_URL}/shots`); //Browser sends GET request, backend recieves it through Controller.GetShots(), backend queries database, backend sends back JSON
  if (!res.ok) throw new Error("Failed to load shots");
  return res.json();
}

export async function createShot(shot: Partial<Shot>): Promise<Shot> {
  const res = await fetch(`${API_BASE_URL}/shots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, //sending JSON 
    body: JSON.stringify(shot), //convert javascript into JSON
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
