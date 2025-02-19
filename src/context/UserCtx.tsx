import React from 'react';

export interface UserContextType {
  getDetail(): Promise<void>;
  getAccess(): Promise<void>;
  showRole(): void;
  hideRole(): void;
  handleGetPicture(userId: string): Promise<void>;
  handleForbidden(newStatus?: boolean): void;
  isReady: boolean;
  profilePicture: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  access: string[];
}

const UserContext = React.createContext<UserContextType | null>(null);

export { UserContext };
