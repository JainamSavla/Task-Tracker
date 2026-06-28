import React, { useState } from 'react';
import './AddTaskForm.css';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onAdd({ title: title.trim(), description: description.trim(), status });
      setTitle('');
      setDescription('');
      setStatus('Pending');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="sidebar">
      <h2>Add New Task</h2>

      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="text Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        {error && <span className="form-error">{error}</span>}
      </div>

      <div className="form-group">
        <label>Task Description</label>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button className="btn-add" onClick={handleSubmit} disabled={loading}>
        {loading ? 'ADDING...' : 'ADD TASK'}
      </button>
    </aside>
  );
}
