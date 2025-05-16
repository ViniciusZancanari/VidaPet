import React from 'react';
import IndexRedirect from './IndexRedirect';
import { AgendamentoProvider } from './page/context/AgendamentoContext';

export default function AppEntry() {
  return (
    <AgendamentoProvider>
      <IndexRedirect />
    </AgendamentoProvider>
  );
}
