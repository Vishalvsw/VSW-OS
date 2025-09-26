
import React from 'react';
import type { Task, TaskStatus } from '../types';

interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onEditTask: (task: Task) => void;
}

const columns: { title: TaskStatus; id: TaskStatus }[] = [
  { title: 'To Do', id: 'To Do' },
  { title: 'In Progress', id: 'In Progress' },
  { title: 'Done', id: 'Done' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onEditTask }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Board</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
            <div key={column.id} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4 pb-2 border-b">{column.title}</h4>
                <div className="space-y-4">
                    {tasks.filter(task => task.status === column.id).map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-md shadow-sm border cursor-pointer hover:shadow-md transition" onClick={() => onEditTask(task)}>
                            <p className="font-medium text-gray-800">{task.title}</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-xs text-gray-500">Assigned to:</span>
                                <div className="flex items-center space-x-2">
                                    <img src={task.assignee.avatar} alt={task.assignee.name} className="h-6 w-6 rounded-full object-cover" />
                                    <span className="text-xs font-medium text-gray-700">{task.assignee.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {tasks.filter(task => task.status === column.id).length === 0 && (
                        <div className="text-center text-sm text-gray-500 py-4">
                            No tasks here.
                        </div>
                    )}
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default KanbanBoard;
