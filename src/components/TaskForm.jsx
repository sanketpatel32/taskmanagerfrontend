import React from "react";

export default function TaskForm({ form, onChange, onSubmit, loading, error, isEditing }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter task title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows="3"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Optional task details"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          name="priority"
          value={form.priority}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
