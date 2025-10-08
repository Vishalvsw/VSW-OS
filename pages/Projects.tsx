import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { initialMockProjects } from '../data/mockData';
import AddProjectModal from '../components/AddProjectModal';
import { useAuth } from '../contexts/AuthContext';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialMockProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();

  const canAddProject = currentUser && ['Administrator', 'Project Manager'].includes(currentUser.role);

  const handleAddProject = (newProject: Omit<Project, 'id' | 'tasks' | 'team'>) => {
    const projectToAdd: Project = {
      ...newProject,
      id: `proj-${Date.now()}`,
      tasks: [],
      team: [ // Add a default team member or make it part of the form
        { id: 'user-1', name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/user-1/100', title: 'Project Manager', role: 'Project Manager' }
      ]
    };
    setProjects(prevProjects => [projectToAdd, ...prevProjects]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        {canAddProject && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700"
          >
            Add Project
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => {
          const totalTasks = project.tasks.length;
          const doneTasks = project.tasks.filter(t => t.status === 'Done').length;
          const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
          
          return (
            <Link to={`/projects/${project.id}`} key={project.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 block">
              <h2 className="text-xl font-semibold text-gray-800 truncate">{project.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Client: {project.client}</p>
              <p className="text-gray-600 mt-3 h-12 overflow-hidden text-ellipsis">{project.description}</p>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gray-500">PROGRESS</span>
                  <span className="text-xs font-bold text-gray-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                   <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">{doneTasks} of {totalTasks} tasks complete</span>
                </div>
              </div>

               <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
                  <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map(member => (
                          <img key={member.id} src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full border-2 border-white object-cover"/>
                      ))}
                      {project.team.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                             +{project.team.length - 3}
                          </div>
                      )}
                  </div>
               </div>
            </Link>
          );
        })}
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
};

export default Projects;