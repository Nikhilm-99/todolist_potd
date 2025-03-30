// TodoTable.js
import React from "react";

export default function TodoTable({ tasks, onEditClick, fetchTasks }) {
  // Optionally, you can use fetchTasks to refresh tasks after deletion
  // if you include a delete handler here as well.
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";


  return (
    <div className="text-center mt-10">
      <span className="text-2xl font-semibold">My Todo List</span>
      <div className="overflow-x-auto mt-6">
        <table className="mx-auto min-w-full max-w-4xl bg-white shadow-md border border-gray-300">
          <thead>
            <tr className="bg-gray-400 text-black font-bold">
              <th className="px-4 py-2 w-[10px]">#</th>
              <th className="px-4 py-2 w-[150px]">Task</th>
              <th className="px-4 py-2 w-[150px]">Due Date</th>
              <th className="px-4 py-2 w-[150px]">Priority</th>
              <th className="px-4 py-2 w-[150px]">Completed</th>
              <th className="px-4 py-2 w-[150px]">Update</th>
              <th className="px-4 py-2 w-[150px]">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.task_id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{task.task_id}</td>
                  <td className="px-4 py-2">{task.description}</td>
                  <td className="px-4 py-2">{task.due_date ? task.due_date.slice(0, 10) : ""}</td>
                  <td className="px-4 py-2">{task.priority}</td>
                  <td className="px-4 py-2">
                    {task.is_complete ? "Completed" : "Pending"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onEditClick(task)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    {/* Add delete button if needed */}
                    <button
                      onClick={async () => {
                        // Example delete function (if desired)
                        try {
                          const response = await fetch(
                            `${API_URL}/api/tasks/${task.task_id}`,
                            { method: "DELETE" }
                          );
                          if (response.ok) {
                            // Refresh tasks after deletion
                            fetchTasks();
                          }
                        } catch (err) {
                          console.error("Error deleting task:", err);
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-gray-500">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
