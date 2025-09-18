import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TaskItem from "../components/TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      if (err.status === 401) {
        navigate("/signin");
      } else {
        setError("Failed to load tasks.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  };

  //imprvement

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) return <Loading message="Loading tasks..." />;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Tasks</h2>
        <Link
          to="/tasks/new"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Task
        </Link>
      </div>

      <ErrorMessage message={error} />

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create one!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
