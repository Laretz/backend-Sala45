// Utilitários e helpers

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatTime = (date: Date): string => {
  return date.toTimeString().split(' ')[0].slice(0, 5);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};