export const stringTrim = (str: string, chars: number): string => {
  return str.length > chars ? `${str.substring(0, chars)}...` : str;
};
