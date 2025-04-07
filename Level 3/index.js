const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
dotenv.config();

const db = new sqlite3.Database('./db/todos.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  completed INTEGER DEFAULT 0,
)`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table "todos" created or already exists.');
    }
});

app.get('/todos', (req, res) => {
    db.all('SELECT * FROM todos', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ todos: todos });
        }
    });
});

app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    db.run('INSERT INTO todos (title) VALUES ($title)', [title], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastInsertID, title: title });
        }
    });
});

app.put('/todos/:id', (req, res) => {
    const { title, completed } = req.body;
    const { id } = req.params;
    db.run('UPDATE todos SET completed = ?, title = ? WHERE id = ?', [title, completed, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Todo not found' });
        } else {
            res.json({ id: id, title: title, completed: completed });
        }
    });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Todo not found' });
        } else {
            res.json({ message: 'Todo deleted successfully' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
