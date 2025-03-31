"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [rap, setRap] = useState("");
  const [word2, setWord2] = useState("");
  const [word1, setWord1] = useState("");
  const [loading, setLoading] = useState(false);
  const [battleMode, setBattleMode] = useState(false);

  const generateRap = async () => {
    if (!word1 || !word2) return;

    setLoading(true);
    setRap("");

    try {
      const response = await axios.post("/api/generateRap", {
        word1,
        word2,
      });

      setRap(response.data.rap);
    } catch (error) {
      alert("Error generating rap. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const playRap = () => {
    if (!rap) return;
    const utterance = new SpeechSynthesisUtterance(rap);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1 className="header">🔥 Rap Bot - Drop Your Words, Get Bars 🔥</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Word 1"
          value={word1}
          onChange={(e) => setWord1(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Word 2"
          value={word2}
          onChange={(e) => setWord2(e.target.value)}
          className="input"
        />

        <div className="toggle-container">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={battleMode}
              onChange={() => setBattleMode(!battleMode)}
            />
            Rap Battle Mode
          </label>
        </div>

        <button
          onClick={generateRap}
          className="generate-button"
          disabled={loading}
        >
          {loading ? "Generating..." : "🎤 Generate Rap"}
        </button>
      </div>

      {rap && (
        <div className="rap-box">
          <pre>{rap}</pre>
          <button onClick={playRap} className="play-button">
            ▶ Play Rap
          </button>
        </div>
      )}
    </div>
  );
}
