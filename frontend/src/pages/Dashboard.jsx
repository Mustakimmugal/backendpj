import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Load Tasks
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);

      // Token invalid or expired
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    loadTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await API.post("/tasks", { title });
      setTitle("");
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
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
        {tasks.length === 0 ? (
          <p>No Tasks Found</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={{ marginBottom: "10px" }}>
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
