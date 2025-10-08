import type { Role, Permission } from '../types';

interface RoleConfig {
  routes: string[];
  permissions: Permission[];
}

export const ROLES_CONFIG: Record<Role, RoleConfig> = {
  Administrator: {
    routes: ['/dashboard', '/projects', '/clients', '/crm', '/marketing', '/team', '/invoices', '/chatbot-builder', '/freelancer-portal', '/settings'],
    permissions: [
      'project:create',
      'client:create',
      'client:edit',
      'lead:create',
      'invoice:create',
      'user:create',
      'user:edit',
      'freelancer:create'
    ],
  },
  'Project Manager': {
    routes: ['/dashboard', '/projects', '/clients', '/crm', '/team', '/freelancer-portal'],
    permissions: [
      'project:create',
      'client:create',
      'client:edit',
      'lead:create',
      'freelancer:create'
    ],
  },
  'Team Member': {
    routes: ['/dashboard', '/projects'],
    permissions: [],
  },
  Client: {
    routes: ['/dashboard', '/projects', '/invoices'],
    permissions: [],
  },
  Freelancer: {
    routes: ['/dashboard', '/projects', '/freelancer-portal'],
    permissions: [],
  }
};