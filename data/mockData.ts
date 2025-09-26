import type { Project, TeamMember, Task, Client } from '../types';

export const mockTeam: TeamMember[] = [
  { id: 'user-1', name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/user-1/100', role: 'Project Manager' },
  { id: 'user-2', name: 'Samantha Carter', avatar: 'https://picsum.photos/seed/user-2/100', role: 'Lead Developer' },
  { id: 'user-3', name: 'Daniel Jackson', avatar: 'https://picsum.photos/seed/user-3/100', role: 'UX Designer' },
  { id: 'user-4', name: 'Teal\'c', avatar: 'https://picsum.photos/seed/user-4/100', role: 'Backend Developer' },
  { id: 'user-5', name: 'George Hammond', avatar: 'https://picsum.photos/seed/user-5/100', role: 'QA Tester' },
];

const project1Tasks: Task[] = [
    { id: 'task-1', title: 'Setup project structure', status: 'Done', assignee: mockTeam[1] },
    { id: 'task-2', title: 'Design user flows', status: 'Done', assignee: mockTeam[2] },
    { id: 'task-3', title: 'Develop login page', status: 'In Progress', assignee: mockTeam[1] },
    { id: 'task-4', title: 'Create dashboard components', status: 'To Do', assignee: mockTeam[3] },
];

const project2Tasks: Task[] = [
    { id: 'task-5', title: 'Market research for Q3', status: 'Done', assignee: mockTeam[0] },
    { id: 'task-6', title: 'Create ad creatives', status: 'In Progress', assignee: mockTeam[2] },
    { id: 'task-7', title: 'Launch social media campaign', status: 'To Do', assignee: mockTeam[0] },
];

export const initialMockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'HRMS Build',
    client: 'Innovate LLC',
    description: 'A comprehensive Human Resource Management System with modules for payroll, attendance, and employee self-service.',
    startDate: '2023-05-01',
    endDate: '2023-09-30',
    budget: 80000,
    team: mockTeam.slice(0, 4),
    tasks: project1Tasks,
  },
  {
    id: 'proj-2',
    name: 'Q3 Marketing Campaign',
    client: 'Solutions Inc.',
    description: 'A digital marketing campaign to boost brand awareness and generate leads for the upcoming quarter.',
    startDate: '2023-07-01',
    endDate: '2023-09-30',
    budget: 25000,
    team: [mockTeam[0], mockTeam[2]],
    tasks: project2Tasks,
  },
  {
    id: 'proj-3',
    name: 'AI Chatbot Integration',
    client: 'Tech Forward',
    description: 'Integrate a new AI-powered chatbot into the client\'s existing customer support portal to improve response times.',
    startDate: '2023-06-15',
    endDate: '2023-08-15',
    budget: 45000,
    team: [mockTeam[1], mockTeam[3], mockTeam[4]],
    tasks: [
        { id: 'task-8', title: 'API integration planning', status: 'Done', assignee: mockTeam[1] },
        { id: 'task-9', title: 'Develop chatbot core logic', status: 'To Do', assignee: mockTeam[3] },
    ],
  },
];

export const mockClients: Client[] = [
    { id: 'client-1', name: 'John Doe', company: 'Innovate LLC', email: 'john@innovate.co', phone: '555-1234', projects: 1, totalBilled: 80000 },
    { id: 'client-2', name: 'Jane Smith', company: 'Solutions Inc.', email: 'jane@solutions.com', phone: '555-5678', projects: 1, totalBilled: 25000 },
    { id: 'client-3', name: 'Peter Jones', company: 'Tech Forward', email: 'peter@techforward.io', phone: '555-9012', projects: 2, totalBilled: 120000 },
    { id: 'client-4', name: 'Susan Lee', company: 'Creative Co.', email: 'susan@creative.co', phone: '555-3456', projects: 0, totalBilled: 0 },
];
