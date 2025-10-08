import { useAuth } from '../contexts/AuthContext';
import { ROLES_CONFIG } from '../config/roles';
import type { Permission } from '../types';

export const usePermissions = () => {
  const { currentUser } = useAuth();

  const can = (permission: Permission): boolean => {
    if (!currentUser) {
      return false;
    }
    const userPermissions = ROLES_CONFIG[currentUser.role]?.permissions || [];
    return userPermissions.includes(permission);
  };

  return { can };
};