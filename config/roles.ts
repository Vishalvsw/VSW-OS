import type { Role } from '../types';

export const ROLES_CONFIG: Record<Role, { permissions: string[] }> = {
  Administrator: {
    permissions: ['/dashboard', '/projects', '/clients', '/crm', '/marketing', '/team', '/invoices', '/chatbot-builder', '/settings'],
  },
  'Project Manager': {
    permissions: ['/dashboard', '/projects', '/clients', '/crm', '/team'],
  },
  'Team Member': {
    permissions: ['/dashboard', '/projects'],
  },
  Client: {
    permissions: ['/dashboard', '/projects', '/invoices'],
  },
};
