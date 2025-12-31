import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getJoke() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // fetch joke on first load
  useEffect(() => {
    getJoke();
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h1>😂 Random Joke App</h1>

        {loading && <p className="loading">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && joke && (
          <>
            <p className="setup">{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </>
        )}

        <button onClick={getJoke}>Get New Joke</button>
      </div>
    </div>
  );
}

export default App;
