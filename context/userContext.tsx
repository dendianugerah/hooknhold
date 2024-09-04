import { createContext } from 'react';

interface UserContextType {
  userId: string;
}

export const UserContext = createContext<UserContextType>({ userId: '' });
