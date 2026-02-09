// removed generated route types import (may be created by react-router typegen)
import { useEffect, useState } from "react";

export function meta() {
  return [
    { title: "CodeLeap - Main" },
    { name: "description", content: "Main page" },
  ];
}

export default function Main() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    try {
      const name = localStorage.getItem("username");
      setUsername(name);
    } catch (e) {
      setUsername(null);
    }
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to CodeLeap</h1>
      {username ? (
        <p className="text-lg">Hello, {username}!</p>
      ) : (
        <p className="text-lg">
          No username found. Please refresh or sign up again.
        </p>
      )}
    </div>
  );
}
