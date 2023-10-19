export const getFromLocalStorage = () => {
  const namesFromLocalStorage = localStorage.getItem('names');
  const names: string[] = namesFromLocalStorage
    ? JSON.parse(namesFromLocalStorage)
    : [];

  return [...names];
}