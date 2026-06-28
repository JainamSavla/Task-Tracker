import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import AddTaskForm from './components/AddTaskForm';
import TaskCard from './components/TaskCard';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const { user, logout } = useAuth();
  const [authPage, setAuthPage] = useState('login'); // 'login' | 'register'

  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterText, setFilterText] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const showToast = (msg) => {
    setToast('');
    setTimeout(() => setToast(msg), 10);
  };

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      setError('');
      const res = await getTasks(filterStatus, filterText);
      setTasks(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      } else {
        setError('Could not connect to server. Make sure the backend is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterText, user, logout]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchTasks();
    }
  }, [fetchTasks, user]);

  const handleAdd = async (data) => {
    const res = await createTask(data);
    setTasks((prev) => [res.data.data, ...prev]);
    showToast('Task added!');
  };

  const handleUpdate = async (id, data) => {
    const res = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
    showToast('Task updated!');
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showToast('Task deleted.');
  };

  // Not logged in — show auth pages
  if (!user) {
    return authPage === 'login'
      ? <LoginPage onSwitch={() => setAuthPage('register')} />
      : <RegisterPage onSwitch={() => setAuthPage('login')} />;
  }

  // Logged in — show dashboard
  return (
    <div className="app-wrapper">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-brand">
          <span></span> TASK TRACKER
        </div>
        <div className="header-right">
          <div className="user-name">👤 {user.name}</div>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </header>

      {/* MAIN */}
      <main className="app-main">
        <AddTaskForm onAdd={handleAdd} />

        <section className="task-panel">
          <h2>All Tasks</h2>

          {/* FILTER BAR */}
          <div className="filter-bar">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Filter by Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Filter status/ text..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* TASK LIST */}
          {loading ? (
            <div className="state-msg">Loading tasks...</div>
          ) : error ? (
            <div className="state-msg error-msg">{error}</div>
          ) : tasks.length === 0 ? (
            <div className="state-msg">No tasks yet. Add your first one!</div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* EDIT MODAL */}
      {editingTask && (
        <EditModal
          task={editingTask}
          onSave={handleUpdate}
          onClose={() => setEditingTask(null)}
        />
      )}

      <Toast message={toast} onClose={() => setToast('')} />

      {/* FOOTER */}
      <footer className="app-footer">
        <span>© 2026 Task Tracker </span>
      </footer>
    </div>
  );
}
