// TodoForm.js
import React, { useState, useEffect } from "react";

export default function TodoForm({ onFormSubmit, editTask, clearEdit }) {
  const [taskDesc, setTaskDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Populate form when editTask changes
  useEffect(() => {
    if (editTask) {
      setTaskDesc(editTask.description || "");
      // Convert date string to proper value if needed (slice to get YYYY-MM-DD)
      setDueDate(editTask.due_date ? editTask.due_date.slice(0, 10) : "");
      setTaskPriority(editTask.priority || "");
      // Assuming the backend column is "is_complete" and it's boolean:
      setTaskCompleted(editTask.is_complete || false);
    } else {
      // Clear form if not editing
      setTaskDesc("");
      setDueDate("");
      setTaskPriority("");
      setTaskCompleted(false);
    }
  }, [editTask]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      description: taskDesc,
      due_date: dueDate,
      priority: taskPriority,
      is_complete: taskCompleted, // sending a boolean
    };

    onFormSubmit(formData);

     // Clear the form fields after submission
    setTaskDesc("");
    setDueDate("");
    setTaskPriority("");
    setTaskCompleted(false);

  }

  return (
    <div className="text-center mt-10">
      <span className="text-4xl font-semibold">
        {editTask ? "Update Todo" : "Todo Form"}
      </span>

      <form
        onSubmit={handleSubmit}
        className="mt-8 mx-auto max-w-3xl p-6 bg-white shadow-md rounded-lg space-y-6"
      >
        <div className="text-left">
          <label className="block text-lg font-medium mb-1">Task Desc:</label>
          <input
            required
            value={taskDesc}
            className="w-full border rounded-md border-gray-400 px-3 py-2"
            type="text"
            onChange={(e) => setTaskDesc(e.target.value)}
          />
        </div>

        <div className="text-left">
          <label className="block text-lg font-medium mb-1">Due Date:</label>
          <input
            required
            value={dueDate}
            className="w-full border rounded-md border-gray-400 px-3 py-2"
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="text-left">
          <label className="block text-lg font-medium mb-1">
            Task Priority:
          </label>
          <select
            required
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            className="w-full border rounded-md border-gray-400 px-3 py-2"
          >
            <option value="" disabled>
              -- Select Priority --
            </option>
            <option value="Very Low">Very Low</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>

        <div className="flex items-center space-x-3 text-left">
          <input
            className="w-5 h-5 cursor-pointer border-gray-400"
            type="checkbox"
            checked={taskCompleted}
            onChange={(e) => setTaskCompleted(e.target.checked)}
          />
          <label className="text-lg">Task Completed?</label>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {editTask ? "Confirm Update" : "Add Todo"}
          </button>
          <button
            type="button"
            onClick={clearEdit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
