import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CITIES } from '../api/mockData';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = localStorage.getItem('filmypass_selected_city');
    return saved ? JSON.parse(saved) : MOCK_CITIES[0];
  });

  // User GPS coordinates state { lat, lng }
  const [userCoords, setUserCoords] = useState(() => {
    const saved = localStorage.getItem('filmypass_user_coords');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('filmypass_selected_city', JSON.stringify(selectedCity));
  }, [selectedCity]);

  useEffect(() => {
    if (userCoords) {
      localStorage.setItem('filmypass_user_coords', JSON.stringify(userCoords));
    } else {
      localStorage.removeItem('filmypass_user_coords');
    }
  }, [userCoords]);

  const changeCity = (cityObj) => {
    setSelectedCity(cityObj);
  };

  return (
    <CityContext.Provider value={{ selectedCity, changeCity, cities: MOCK_CITIES, userCoords, setUserCoords }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
