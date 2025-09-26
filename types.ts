export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

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
  team: TeamMember[];
  tasks: Task[];
  budget: number;
}

export interface GeneratedProposal {
  title: string;
  clientName: string;
  introduction: string;
  scopeOfWork: {
    title: string;
    description: string;
  }[];
  timeline: {
    phase: string;
    duration: string;
  }[];
  pricing: {
    item: string;
    cost: string;
  }[];
  conclusion: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';

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
    projects: number; // Number of projects
    totalBilled: number;
}
