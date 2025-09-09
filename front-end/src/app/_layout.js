// src/app/_layout.js
import { Stack } from 'expo-router';
// CORREÇÃO AQUI: O caminho relativo foi ajustado.
import { AuthProvider } from './context/AuthContext'; 

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}