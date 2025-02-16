"use client";

import { useState } from "react";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subtitle }),
    });

    if (res.ok) {
      setMessage("Blog successfully created!");
      setTitle("");
      setSubtitle("");
    } else {
      setMessage("Error creating blog.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Create a Blog</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subtitle:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
