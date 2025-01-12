import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const AgendamentoContext = createContext();

// Provedor do contexto
export const AgendamentoProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <AgendamentoContext.Provider value={{ selectedDate, setSelectedDate, selectedTime, setSelectedTime }}>
      {children}
    </AgendamentoContext.Provider>
  );
};

// Hook para usar o contexto
export const useAgendamento = () => useContext(AgendamentoContext);
