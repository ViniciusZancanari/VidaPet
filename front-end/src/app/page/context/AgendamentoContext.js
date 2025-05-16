import React, { createContext, useContext, useState } from 'react';

const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <AgendamentoContext.Provider value={{ selectedDate, setSelectedDate, selectedTime, setSelectedTime }}>
      {children}
    </AgendamentoContext.Provider>
  );
};

export const useAgendamento = () => useContext(AgendamentoContext);
