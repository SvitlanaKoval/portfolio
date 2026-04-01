export const isRequired = (value: string): string =>
  value.trim() ? '' : 'This field is required.';

export const isEmail = (value: string): string => {
  if (!value.trim()) return 'This field is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? '' : 'Enter a valid email address.';
};
