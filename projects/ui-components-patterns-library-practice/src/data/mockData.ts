export type UserRecord = {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Pending' | 'Archived';
  email: string;
};

export const mockUsers: UserRecord[] = [
  { id: 1001, name: 'Ava Johnson', role: 'Admin', status: 'Active', email: 'ava@example.com' },
  { id: 1002, name: 'Leo Martinez', role: 'Billing Specialist', status: 'Pending', email: 'leo@example.com' },
  { id: 1003, name: 'Mia Chen', role: 'Support', status: 'Active', email: 'mia@example.com' },
  { id: 1004, name: 'Noah Davis', role: 'Analyst', status: 'Archived', email: 'noah@example.com' },
];
