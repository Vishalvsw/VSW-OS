import type { Project, TeamMember, Task, Client, Freelancer, CommissionDeal, ScheduledPost } from '../types';

export const mockTeam: TeamMember[] = [
  { id: 'admin-1', name: 'Admin User', avatar: 'https://picsum.photos/seed/admin-1/100', title: 'System Administrator', role: 'Administrator' },
  { id: 'admin-2', name: 'Vishal Wagaraj', avatar: 'https://picsum.photos/seed/admin-2/100', title: 'CEO and Founder', role: 'Administrator' },
  { id: 'user-1', name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/user-1/100', title: 'Project Manager', role: 'Project Manager' },
  { id: 'user-2', name: 'Samantha Carter', avatar: 'https://picsum.photos/seed/user-2/100', title: 'Lead Developer', role: 'Team Member' },
  { id: 'user-3', name: 'Daniel Jackson', avatar: 'https://picsum.photos/seed/user-3/100', title: 'UX Designer', role: 'Team Member' },
  { id: 'user-4', name: 'Teal\'c', avatar: 'https://picsum.photos/seed/user-4/100', title: 'Backend Developer', role: 'Team Member' },
  { id: 'user-5', name: 'George Hammond', avatar: 'https://picsum.photos/seed/user-5/100', title: 'QA Tester', role: 'Team Member' },
  { id: 'client-user-1', name: 'John Doe (Client)', avatar: 'https://picsum.photos/seed/client-user-1/100', title: 'Client Contact', role: 'Client' },
  { id: 'freelancer-1', name: 'Maria Garcia (Freelancer)', avatar: 'https://picsum.photos/seed/freelancer-1/100', title: 'Freelance Web Developer', role: 'Freelancer' },
];

const project1Tasks: Task[] = [
    { id: 'task-1', title: 'Setup project structure', status: 'Done', assignee: mockTeam[2] },
    { id: 'task-2', title: 'Design user flows', status: 'Done', assignee: mockTeam[3] },
    { id: 'task-3', title: 'Develop login page', status: 'In Progress', assignee: mockTeam[2] },
    { id: 'task-4', title: 'Create dashboard components', status: 'To Do', assignee: mockTeam[4] },
];

const project2Tasks: Task[] = [
    { id: 'task-5', title: 'Market research for Q3', status: 'Done', assignee: mockTeam[1] },
    { id: 'task-6', title: 'Create ad creatives', status: 'In Progress', assignee: mockTeam[3] },
    { id: 'task-7', title: 'Launch social media campaign', status: 'To Do', assignee: mockTeam[1] },
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
    team: mockTeam.slice(1, 5),
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
    team: [mockTeam[1], mockTeam[3]],
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
    team: [mockTeam[2], mockTeam[4], mockTeam[5]],
    tasks: [
        { id: 'task-8', title: 'API integration planning', status: 'Done', assignee: mockTeam[2] },
        { id: 'task-9', title: 'Develop chatbot core logic', status: 'To Do', assignee: mockTeam[4] },
    ],
  },
];

export const mockClients: Client[] = [
    { id: 'client-1', name: 'John Doe', company: 'Innovate LLC', email: 'john@innovate.co', phone: '555-1234', projects: 1, totalBilled: 80000 },
    { id: 'client-2', name: 'Jane Smith', company: 'Solutions Inc.', email: 'jane@solutions.com', phone: '555-5678', projects: 1, totalBilled: 25000 },
    { id: 'client-3', name: 'Peter Jones', company: 'Tech Forward', email: 'peter@techforward.io', phone: '555-9012', projects: 2, totalBilled: 120000 },
    { id: 'client-4', name: 'Susan Lee', company: 'Creative Co.', email: 'susan@creative.co', phone: '555-3456', projects: 0, totalBilled: 0 },
];

export const mockFreelancers: Freelancer[] = [
    { id: 'freelancer-1', name: 'Maria Garcia', email: 'maria.g@example.com', specialty: 'Web Development', commissionRate: 10 },
    { id: 'freelancer-2', name: 'David Chen', email: 'david.c@example.com', specialty: 'SEO & Marketing', commissionRate: 12 },
    { id: 'freelancer-3', name: 'Emily White', email: 'emily.w@example.com', specialty: 'Graphic Design', commissionRate: 8 },
];

export const mockCommissionDeals: CommissionDeal[] = [
    { 
        id: 'deal-1',
        freelancer: { id: 'freelancer-1', name: 'Maria Garcia' },
        client: { id: 'client-4', name: 'Susan Lee', company: 'Creative Co.' },
        projectName: 'E-commerce Platform',
        projectValue: 60000,
        commissionRate: 10,
        commissionAmount: 6000,
        status: 'Paid',
        dateClosed: '2023-07-15'
    },
    { 
        id: 'deal-2',
        freelancer: { id: 'freelancer-2', name: 'David Chen' },
        client: { id: 'client-2', name: 'Jane Smith', company: 'Solutions Inc.' },
        projectName: 'Q4 SEO Strategy',
        projectValue: 15000,
        commissionRate: 12,
        commissionAmount: 1800,
        status: 'Pending Payment',
        dateClosed: '2023-08-01'
    }
];

export const mockScheduledPosts: ScheduledPost[] = [
    { id: 'post-1', day: 'Monday', platform: 'LinkedIn', content: 'The future of AI in project management. #AI #ProjectManagement', image: 'https://picsum.photos/seed/post-1/400/200', status: 'Scheduled' },
    { id: 'post-2', day: 'Tuesday', platform: 'Instagram', content: 'Behind the scenes of our latest design sprint! 🎨', image: 'https://picsum.photos/seed/post-2/400/400', status: 'Scheduled' },
    { id: 'post-3', day: 'Wednesday', platform: 'Twitter', content: 'Quick Tip: How to optimize your CRM workflow in under 5 minutes. #CRM #Productivity', image: 'https://picsum.photos/seed/post-3/400/200', status: 'Scheduled' },
    { id: 'post-4', day: 'Wednesday', platform: 'Facebook', content: 'Case Study: How we helped Innovate LLC boost their revenue by 30%.', image: 'https://picsum.photos/seed/post-4/400/200', status: 'Posted' },
    { id: 'post-5', day: 'Friday', platform: 'LinkedIn', content: 'Celebrating another successful project launch! Congrats to the team and our amazing client, Tech Forward.', image: 'https://picsum.photos/seed/post-5/400/200', status: 'Scheduled' },
    { id: 'post-6', day: 'Friday', platform: 'Instagram', content: 'It\'s Friday! Time to power down... but not before one last code push. 😉 #DevLife', image: 'https://picsum.photos/seed/post-6/400/400', status: 'Draft' },
    { id: 'post-7', day: 'Sunday', platform: 'Facebook', content: 'Get ready for the week ahead! What are your goals for the next 7 days?', image: 'https://picsum.photos/seed/post-7/400/200', status: 'Scheduled' },
];