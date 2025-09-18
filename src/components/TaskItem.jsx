import React from "react";
import { Link } from "react-router-dom";

export default function TaskItem({ task, onDelete }) {
  // --- Helpers ---
  const formatTitle = (title) =>
    title.length > 25 ? title.slice(0, 25) + "…" : title;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const statusColors = {
    todo: "bg-gray-200 text-gray-700",
    doing: "bg-blue-200 text-blue-700",
    done: "bg-green-200 text-green-700",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <article className="flex justify-between items-start border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white">
      {/* Task info */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Title */}
        <h3
          className="font-semibold text-lg text-gray-900 truncate"
          title={task.title}
        >
          {formatTitle(task.title)}
        </h3>

        {/* Description */}
        {task.description && (
          <p
            className="text-sm text-gray-600 line-clamp-2"
            title={task.description}
          >
            {task.description}
          </p>
        )}

        {/* Labels */}
        <div className="flex items-center gap-2 text-sm mt-1">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              statusColors[task.status] || "bg-gray-200 text-gray-700"
            }`}
          >
            {task.status.toUpperCase()}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              priorityColors[task.priority] || "bg-gray-100 text-gray-600"
            }`}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              Due: {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 space-x-2">
        <Link
          to={`/tasks/${task._id}/edit`}
          className="px-3 py-1.5 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          🗑 Delete
        </button>
      </div>
    </article>
  );
}
