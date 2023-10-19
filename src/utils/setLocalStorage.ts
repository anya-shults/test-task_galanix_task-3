import { getFromLocalStorage } from './getFromLocalStorage';

export const setLocalStorage = (name: string) => {
  const names = getFromLocalStorage();

  const newNames = names.find(nameFromNames => nameFromNames === name)
    ? names.filter(nameFromNames => nameFromNames !== name)
    : [...names, name];

  localStorage.setItem('names', JSON.stringify(newNames) );
}