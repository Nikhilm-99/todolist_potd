// App.js
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TodoForm from "./TodoForm";
import TodoTable from "./TodoTable";




function App() {
  const [tasks, setTasks] = useState([]);       // All tasks
  const [editTask, setEditTask] = useState(null); // Task currently being edited

  // Use the environment variable; fallback to localhost if not defined
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  // 1. Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("${API_URL}/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Handle form submission (add or update)
  const handleFormSubmit = async (formData) => {
    if (editTask) {
      // Update task: Send PUT request
      try {
        const response = await fetch(
          `${API_URL}/api/tasks/${editTask.task_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        await response.json();
        setEditTask(null); // clear edit mode
        fetchTasks();      // refresh task list
      } catch (err) {
        console.error("Error updating task:", err);
      }
    } else {
      // Add new task: Send POST request
      try {
        const response = await fetch("${API_URL}/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        await response.json();
        fetchTasks(); // refresh task list
      } catch (err) {
        console.error("Error adding task:", err);
      }
    }
  };

  // 3. When user clicks Update on a row, set that task as the edit task
  const handleEditClick = (task) => {
    setEditTask(task);
  };

  // 4. Clear edit mode (e.g., when clicking clear form)
  const clearEdit = () => {
    setEditTask(null);
  };

  return (
    <div className="font-serif">
      <Navbar />
      {/* Pass down the current editTask, form submit handler, and clearEdit */}
      <TodoForm
        onFormSubmit={handleFormSubmit}
        editTask={editTask}
        clearEdit={clearEdit}
      />
      {/* Pass down tasks and the edit click handler */}
      <TodoTable tasks={tasks} onEditClick={handleEditClick} fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;
