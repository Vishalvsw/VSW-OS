// types.ts

export type Role = 'Administrator' | 'Project Manager' | 'Team Member' | 'Client' | 'Freelancer';

export type Permission = 
  | 'project:create'
  | 'client:create'
  | 'client:edit'
  | 'lead:create'
  | 'invoice:create'
  | 'user:create'
  | 'user:edit'
  | 'freelancer:create';

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  title: string;
  role: Role;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: TeamMember;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  team: TeamMember[];
  tasks: Task[];
}

export type LeadStatus = 'Qualified' | 'Contacted' | 'New' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  status: LeadStatus;
  value: number;
}

export type InvoiceStatus = 'Paid' | 'Sent' | 'Overdue' | 'Draft';

export interface Invoice {
  id: string;
  project: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
}

export interface GeneratedProposal {
  title: string;
  clientName: string;
  introduction: string;
  scopeOfWork: { title: string; description: string }[];
  timeline: { phase: string; duration: string }[];
  pricing: { item: string; cost: string }[];
  conclusion: string;
}

export interface Persona {
  id: string;
  name: string;
  instruction: string;
  isDefault?: boolean;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projects: number;
  totalBilled: number;
}

export interface Freelancer {
  id: string;
  name: string;
  email: string;
  specialty: string;
  commissionRate: number;
}

export type CommissionStatus = 'Paid' | 'Pending Payment';

export interface CommissionDeal {
  id: string;
  freelancer: { id: string; name: string };
  client: { id: string; name: string; company: string };
  projectName: string;
  projectValue: number;
  commissionRate: number;
  commissionAmount: number;
  status: CommissionStatus;
  dateClosed: string;
}

export type SocialPlatform = 'Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter';
export type PostStatus = 'Scheduled' | 'Posted' | 'Draft';

export interface ScheduledPost {
  id: string;
  day: string;
  platform: SocialPlatform;
  content: string;
  image: string;
  status: PostStatus;
}

export type ColdLeadStatus = 'New' | 'Contacted' | 'Interested' | 'Not Interested';

export interface ColdLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ColdLeadStatus;
}