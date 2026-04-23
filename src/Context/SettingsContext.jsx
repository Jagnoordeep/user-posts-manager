import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load from localStorage
    const savedNotifications = localStorage.getItem('notificationsEnabled');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    setNotificationsEnabled(savedNotifications !== 'false');
    setTheme(savedTheme);
  }, []);

  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem('notificationsEnabled', newValue);
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <SettingsContext.Provider value={{
      notificationsEnabled,
      toggleNotifications,
      theme,
      updateTheme
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);