import React from "react";
import { Link } from "react-router-dom";

// --- Constant Maps (outside component so they aren't recreated each render) ---
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

/**
 * TaskItem Component
 * ------------------
 * Renders a single task card with:
 * - Title and description
 * - Due date 
 * - Description
 * - Status and priority badges
 * - Edit and Delete actions
 */
export default function TaskItem({ task, onDelete }) {
  // --- Helpers ---
  const formatTitle = (title) =>
    title.length > 25 ? title.slice(0, 25) + "…" : title;

  const formatDate = (date) =>
    new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  return (
    <article
      className="flex justify-between items-start border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white"
      aria-label={`Task: ${task.title}`}
    >
      {/* --- Task Info --- */}
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

        {/* Due Date */}
        {task.dueDate && (
          <time
            className="block text-xs text-gray-500 mt-1"
            dateTime={task.dueDate}
          >
            Due: {formatDate(task.dueDate)}
          </time>
        )}

        {/* Labels: Status + Priority */}
        <div className="flex items-center gap-2 text-sm mt-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              statusColors[task.status] || statusColors.todo
            }`}
          >
            {task.status.toUpperCase()}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              priorityColors[task.priority] || priorityColors.low
            }`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </div>

      {/* --- Actions --- */}
      <div className="flex-shrink-0 space-x-2 ml-4">
        <Link
          to={`/tasks/${task._id}/edit`}
          className="px-3 py-1.5 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
          aria-label={`Edit task: ${task.title}`}
        >
          ✏️ Edit
        </Link>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          aria-label={`Delete task: ${task.title}`}
        >
          🗑 Delete
        </button>
      </div>
    </article>
  );
}
