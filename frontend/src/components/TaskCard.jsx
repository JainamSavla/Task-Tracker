import React, { useState, useRef, useEffect } from 'react';
import './TaskCard.css';

const BADGE = {
  'In Progress': 'badge-inprogress',
  'Completed': 'badge-completed',
  'Pending': 'badge-pending',
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showBadge = task.status !== 'Pending';

  return (
    <div className="task-card">
      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-desc">{task.description}</div>
        )}
        {showBadge && (
          <span className={`badge ${BADGE[task.status]}`}>{task.status}</span>
        )}
      </div>

      <div className="task-actions" ref={dropRef}>
        <button className="btn-edit" onClick={() => setOpen((v) => !v)}>
          Edit <span className="caret">▾</span>
        </button>
        {open && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => { setOpen(false); onEdit(task); }}
            >
              ✏️ Edit Task
            </div>
            <div
              className="dropdown-item delete"
              onClick={() => { setOpen(false); onDelete(task._id); }}
            >
              🗑️ Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
