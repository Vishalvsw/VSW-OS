
import React, { useState, useEffect } from 'react';
import { Task, TeamMember, TaskStatus } from '../types';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdateTask: (task: Task) => void;
  teamMembers: TeamMember[];
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onUpdateTask, teamMembers }) => {
  const [title, setTitle] = useState(task.title);
  const [assigneeId, setAssigneeId] = useState(task.assignee.id);
  const [status, setStatus] = useState<TaskStatus>(task.status);

  useEffect(() => {
    setTitle(task.title);
    setAssigneeId(task.assignee.id);
    setStatus(task.status);
  }, [task]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignee = teamMembers.find(m => m.id === assigneeId);
    if (!assignee) return;

    onUpdateTask({
      ...task,
      title,
      assignee,
      status,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Edit Task</h2>
          </div>
          <div className="px-6 py-4 space-y-4 border-t border-b">
            <div>
              <label htmlFor="edit-task-title" className="block text-sm font-medium text-gray-700">Task Title</label>
              <input type="text" id="edit-task-title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="edit-task-assignee" className="block text-sm font-medium text-gray-700">Assign To</label>
                    <select id="edit-task-assignee" value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required>
                    {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                    </select>
                </div>
                 <div>
                    <label htmlFor="edit-task-status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select id="edit-task-status" value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
