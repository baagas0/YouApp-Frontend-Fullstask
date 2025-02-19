'use client';

import { Provider } from 'react-redux';
import React from 'react';
import rematchStore from '../rematch';

function ReduxProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <Provider store={rematchStore}>{children}</Provider>;
}

export default ReduxProvider;
