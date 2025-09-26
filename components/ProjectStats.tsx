
import React, { useMemo } from 'react';
import type { Project, Task } from '../types';

interface ProjectStatsProps {
  project: Project;
  tasks: Task[];
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ project, tasks }) => {
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Done').length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const today = new Date();
    const endDate = new Date(project.endDate);
    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    
    return {
      progress,
      daysRemaining,
      totalTasks,
      completedTasks,
    };
  }, [project, tasks]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-500">Project Progress</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.progress}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${stats.progress}%` }}></div>
        </div>
      </div>
       <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-500">Days Remaining</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.daysRemaining}</p>
        <p className="mt-2 text-xs text-gray-500">End Date: {new Date(project.endDate).toLocaleDateString()}</p>
      </div>
       <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-500">Total Tasks</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalTasks}</p>
         <p className="mt-2 text-xs text-gray-500">&nbsp;</p>
      </div>
       <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.completedTasks}</p>
         <p className="mt-2 text-xs text-gray-500">&nbsp;</p>
      </div>
    </div>
  );
};

export default ProjectStats;
