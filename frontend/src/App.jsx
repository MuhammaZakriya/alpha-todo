import { useState, useEffect, useCallback } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  
  const fetchTasks = useCallback(async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  }, [API_URL]);

  const addTask = async () => {
    if (!taskText) return;
    await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskText, done: false }), 
    });
    setTaskText("");
    fetchTasks();
  };

  // ✅ Fix 3: Add fetchTasks to dependency array
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
          <li key={i}>{t.title}</li> // ✅ Fix 4: t.task → t.title
        ))}
      </ul>
    </div>
  );
}

export default App;