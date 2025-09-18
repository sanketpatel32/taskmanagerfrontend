import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask, fetchTasks } from "../api";
import TaskForm from "../components/TaskForm";

export default function TaskEditor() {
  const { id } = useParams(); // if id exists → editing
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load task data if editing
  useEffect(() => {
    if (!id) return;
    const loadTask = async () => {
      try {
        const tasks = await fetchTasks();
        const task = tasks.find((t) => t._id === id);
        if (task) {
          setForm({
            title: task.title,
            description: task.description || "",
            dueDate: task.dueDate
              ? new Date(task.dueDate).toISOString().slice(0, 10)
              : "",
            priority: task.priority,
            status: task.status,
          });
        }
      } catch {
        setError("Failed to load task.");
      }
    };
    loadTask();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (id) {
        await updateTask(id, form);
      } else {
        await createTask(form);
      }
      navigate("/tasks", { replace: true });
    } catch {
      setError("Failed to save task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {id ? "Edit Task" : "New Task"}
      </h2>
      <TaskForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        isEditing={!!id}
      />
    </div>
  );
}
