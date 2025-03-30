require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require("path");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup connection pool for PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Routes

// 1. Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY task_id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// 2. Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
      // Note: Renamed 'status' to 'is_complete'
      const { description, due_date, priority, is_complete } = req.body;
      const newTask = await pool.query(
        `INSERT INTO tasks (description, due_date, priority, is_complete) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [description, due_date, priority, is_complete]
      );
      res.json(newTask.rows[0]);
    } catch (err) {
      console.error("Error in POST /api/tasks:", err.message);
      res.status(500).send('Server error');
    }
  });
  

// 3. Update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { description, due_date, priority, is_complete } = req.body;
  
      const updateTask = await pool.query(
        `UPDATE tasks
         SET description = $1,
             due_date = $2,
             priority = $3,
             is_complete = $4
         WHERE task_id = $5
         RETURNING *`,
        [description, due_date, priority, is_complete, id]
      );
  
      if (updateTask.rows.length === 0) {
        return res.status(404).send('Task not found');
      }
  
      res.json(updateTask.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
    
// 4. Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query(
      'DELETE FROM tasks WHERE task_id = $1 RETURNING *',
      [id]
    );

    if (deleteTask.rows.length === 0) {
      return res.status(404).send('Task not found');
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Serve any static files from the React app
    app.use(express.static(path.join(__dirname, "../client/build")));
  
    // Handle React routing, return all requests to React app
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
  }

  

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
