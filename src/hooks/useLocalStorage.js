import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const clearValue = () => {
    window.sessionStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, clearValue];
};

export default useLocalStorage;
