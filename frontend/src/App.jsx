import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  // Use environment variable with fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!taskText) return;
    await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskText }),
    });
    setTaskText("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>{t.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;