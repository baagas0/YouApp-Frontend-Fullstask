import React from 'react';
import { UserContext } from '@/context/UserCtx';

export const useUser = () => {
  const value = React.useContext(UserContext);
  if (!value) {
    throw new Error('ProfileContext is not provided');
  }
  return value;
};