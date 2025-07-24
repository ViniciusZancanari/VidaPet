import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
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

// Hook personalizado para acessar o contexto
export const useAgendamento = () => useContext(AgendamentoContext);
