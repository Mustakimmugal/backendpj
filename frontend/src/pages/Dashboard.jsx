import { useEffect, useState } from "react";
import API from "../api";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await API.get("/api/v1/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await API.post("/api/v1/tasks", { title });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/api/v1/tasks/${id}`);
    loadTasks();
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <button onClick={logoutHandler}>Logout</button>

      <hr />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <button onClick={addTask}>Add Task</button>

      <div style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <div key={task._id} style={{ marginBottom: "10px" }}>
            <span>{task.title}</span>
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
