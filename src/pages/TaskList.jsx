import React, { useEffect, useState, useMemo,useCallback } from "react";
import { fetchTasks, deleteTask } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TaskItem from "../components/TaskItem";

export default function TaskList() {
    // All tasks fetched from backend
    const [tasks, setTasks] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Number of tasks currently visible
    const [visibleCount, setVisibleCount] = useState(5);

    const navigate = useNavigate();

    //   Fetch tasks from API
    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchTasks("asc"); 
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
    }, [navigate]);





    //Delete a task by ID 
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await deleteTask(id);
            // Remove the deleted task from state
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch {
            setError("Failed to delete task.");
        }
    };

    /**
     * Memoized list of visible tasks
     * - Prevents recalculating slice on every render
     * - Only recalculates when tasks or visibleCount changes
     */
    const visibleTasks = useMemo(() => {
        return tasks.slice(0, visibleCount);
    }, [tasks, visibleCount]);

    // Load tasks on first render
    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    if (loading) return <Loading message="Loading tasks..." />;

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Tasks</h2>
                <Link
                    to="/tasks/new"
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + New Task
                </Link>
            </div>

            {/* Error message if any */}
            <ErrorMessage message={error} />

            {/* Task list */}
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks yet. Create one!</p>
            ) : (
                <>
                    {/* Render only the visible slice of tasks */}
                    <ul className="space-y-3">
                        {visibleTasks.map((task) => (
                            <TaskItem key={task._id} task={task} onDelete={handleDelete} />
                        ))}
                    </ul>

                    {/* "Show More" button if there are more tasks */}
                    {visibleCount < tasks.length && (
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 5)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
