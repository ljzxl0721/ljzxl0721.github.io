import React from 'react';
import { useRole } from './RoleContext';
import styles from './RoleSelector.module.css';

export default function RoleSelector({ onRoleSelect }) {
  const { roles, selectRole } = useRole();

  const handleRoleSelect = (roleId) => {
    selectRole(roleId);
    onRoleSelect && onRoleSelect(roleId);
  };

  return (
    <div className={styles.roleSelectorContainer}>
      <h3>选择对话角色</h3>
      <div className={styles.roleGrid}>
        {roles.map((role) => (
          <div 
            key={role.id} 
            className={styles.roleCard}
            onClick={() => handleRoleSelect(role.id)}
          >
            <img 
              src={role.avatar} 
              alt={role.name} 
              className={styles.roleAvatar} 
            />
            <p className={styles.roleName}>{role.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 