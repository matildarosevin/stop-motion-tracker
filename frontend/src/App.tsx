import { useEffect, useState } from "react";
import type { Shot, ShotStatus } from "./types";
import { getShots, createShot } from "./api";
import "./App.css";

const STATUSES: ShotStatus[] = [
  "NotStarted",
  "SetBuild",
  "Shooting",
  "Editing",
  "SoundDesign",
  "Done",
];

function App() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    sceneNumber: "",
    shotNumber: "",
    description: "",
    soundNotes: "",
  });

  useEffect(() => {
    getShots()
      .then(setShots)
      .catch(() => setError("Couldn't reach the API yet — start the backend (see README)."))
      .finally(() => setLoading(false));
  }, []);

  async function handleAddShot(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newShot = await createShot({ ...form, status: "NotStarted" });
      setShots((prev) => [...prev, newShot]);
      setForm({ sceneNumber: "", shotNumber: "", description: "", soundNotes: "" });
    } catch {
      setError("Couldn't save that shot — is the API running?");
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Stop-Motion Production Tracker</h1>
        <p className="subtitle">Track shots, animators and sound notes across a production.</p>
      </header>

      {error && <p className="error">{error}</p>}

      <section>
        <h2>Add a shot</h2>
        <form onSubmit={handleAddShot} className="shot-form">
          <input
            placeholder="Scene no."
            value={form.sceneNumber}
            onChange={(e) => setForm({ ...form, sceneNumber: e.target.value })}
            required
          />
          <input
            placeholder="Shot no."
            value={form.shotNumber}
            onChange={(e) => setForm({ ...form, shotNumber: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            placeholder="Sound notes"
            value={form.soundNotes}
            onChange={(e) => setForm({ ...form, soundNotes: e.target.value })}
          />
          <button type="submit">Add shot</button>
        </form>
      </section>

      <section>
        <h2>Shots</h2>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Scene</th>
                <th>Shot</th>
                <th>Description</th>
                <th>Status</th>
                <th>Sound notes</th>
              </tr>
            </thead>
            <tbody>
              {shots.map((shot) => (
                <tr key={shot.id}>
                  <td>{shot.sceneNumber}</td>
                  <td>{shot.shotNumber}</td>
                  <td>{shot.description}</td>
                  <td>
                    <span className={`status status-${shot.status}`}>{shot.status}</span>
                  </td>
                  <td>{shot.soundNotes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer>
        <p>Statuses: {STATUSES.join(" → ")}</p>
      </footer>
    </div>
  );
}

export default App;
