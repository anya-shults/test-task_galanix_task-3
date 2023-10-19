import { getFromLocalStorage } from './getFromLocalStorage';

export const getSavedUniversityCount = () => {
  return getFromLocalStorage().length || 0;
};