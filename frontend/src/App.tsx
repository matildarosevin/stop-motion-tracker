import { useEffect, useState } from "react"; //Hoooks for state management
import type { Shot, ShotStatus } from "./types"; //The TypeScriot interface lives in one place
import { getShots, createShot } from "./api"; //Keeps HTTP logic isolated
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
  const [shots, setShots] = useState<Shot[]>([]); //React Hook, adds "memory" to a component. updating it refreshes the screen. 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); //these variables tell us - what should be on the screen right now 
  const [form, setForm] = useState({
    sceneNumber: "",
    shotNumber: "",
    description: "",
    soundNotes: "",
  });

  useEffect(() => { //useEffect is a React Hook, When this component first loads, run this function. 
    getShots() //calls async function from api.ts
      .then(setShots) 
      .catch(() => setError("Couldn't reach the API yet — start the backend (see README)."))
      .finally(() => setLoading(false)); 
  }, []); //run once, when mounted .then .catch .finally are promise handlers. 

  async function handleAddShot(e: React.FormEvent) {
    e.preventDefault(); //Stop page refresh 
    try {
      const newShot = await createShot({ ...form, status: "NotStarted" }); //...form spread operator, copy all form values. All new shots start as default not started
      setShots((prev) => [...prev, newShot]); //send to backend API
      setForm({ sceneNumber: "", shotNumber: "", description: "", soundNotes: "" });
    } catch {
      setError("Couldn't save that shot — is the API running?"); //handle if backend fails 
    }
  }

  return ( //rendering the table 
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
              {shots.map((shot) => ( //loop through shots and create row for each, key tells react which rows have changed
                <tr key={shot.id}> {/*Tells React which rows have changed*/}
                  <td>{shot.sceneNumber}</td>
                  <td>{shot.shotNumber}</td>
                  <td>{shot.description}</td>
                  <td>
                    <span className={`status status-${shot.status}`}>{shot.status}</span> {/*Dynamic CSS Class*/}
                  </td>
                  <td>{shot.soundNotes ?? "—"}</td> {/*Assigns soundNotes as - if a null input is given*/}
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
