import { Profile } from '@/apis/auth';
import React from 'react';

export interface UserContextType {
  getDetail(): Promise<void>;
  isReady: boolean;
  user: Profile;
}

const UserContext = React.createContext<UserContextType | null>(null);

export { UserContext };
