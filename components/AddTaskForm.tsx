
import React, { useState } from 'react';
import { Task, TeamMember } from '../types';

interface AddTaskFormProps {
    onAddTask: (task: Omit<Task, 'id'>) => void;
    teamMembers: TeamMember[];
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, teamMembers }) => {
    const [title, setTitle] = useState('');
    const [assigneeId, setAssigneeId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !assigneeId) return;
        
        const assignee = teamMembers.find(m => m.id === assigneeId);
        if(!assignee) return;

        onAddTask({
            title,
            status: 'To Do',
            assignee
        });
        setTitle('');
        setAssigneeId('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">Task Title</label>
                    <input
                        type="text"
                        id="task-title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="task-assignee" className="block text-sm font-medium text-gray-700">Assign To</label>
                    <select
                        id="task-assignee"
                        value={assigneeId}
                        onChange={e => setAssigneeId(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        required
                    >
                        <option value="" disabled>Select a team member</option>
                        {teamMembers.map(member => (
                            <option key={member.id} value={member.id}>{member.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskForm;
