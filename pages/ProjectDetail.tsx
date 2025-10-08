
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Project, Task } from '../types';
import { initialMockProjects } from '../data/mockData';
import KanbanBoard from '../components/KanbanBoard';
import ProjectStats from '../components/ProjectStats';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskModal from '../components/EditTaskModal';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditingTask, setIsEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const foundProject = initialMockProjects.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      setTasks(foundProject.tasks);
    }
  }, [projectId]);
  
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setIsEditingTask(null);
  };
  
  const handleTaskAdd = (newTask: Omit<Task, 'id'>) => {
      const taskToAdd: Task = {
          ...newTask,
          id: `task-${Date.now()}`
      }
      setTasks(prevTasks => [...prevTasks, taskToAdd]);
  }

  const onTaskStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };
  
  if (!project) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <Link to="/projects" className="text-primary hover:underline mt-4 inline-block">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
            <p className="text-lg text-gray-600 mt-1">Client: {project.client}</p>
            <p className="mt-4 text-gray-700">{project.description}</p>
        </div>

        <ProjectStats project={project} tasks={tasks} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                 <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Team</h3>
                    <ul className="space-y-3">
                        {project.team.map(member => (
                            <li key={member.id} className="flex items-center space-x-3">
                                <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-medium text-gray-800">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <AddTaskForm onAddTask={handleTaskAdd} teamMembers={project.team} />
            </div>
            <div className="lg:col-span-2">
                <KanbanBoard tasks={tasks} onStatusChange={onTaskStatusChange} onEditTask={setIsEditingTask} />
            </div>
        </div>
        {isEditingTask && (
            <EditTaskModal 
                isOpen={!!isEditingTask}
                onClose={() => setIsEditingTask(null)}
                task={isEditingTask}
                onUpdateTask={handleTaskUpdate}
                teamMembers={project.team}
            />
        )}
    </div>
  );
};

export default ProjectDetail;