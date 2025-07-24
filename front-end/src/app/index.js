import React from 'react';
import IndexRedirect from './IndexRedirect';
import { AgendamentoProvider } from './page/context/AgendamentoContext';
import { AuthProvider } from './context/AuthContext';
export default function AppEntry() {
  return (
    <AuthProvider>
      <IndexRedirect />
    </AuthProvider>
  );
}
