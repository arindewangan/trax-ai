import React, { useState } from 'react';
import { fetchWeatherData, formatDataForGemini, callGeminiAPI } from '../utils/api';

const ItineraryForm = ({ setItinerary, setIsLoading, setError }) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'location') setLocation(value);
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeatherData(location, startDate, endDate);
      const geminiPrompt = formatDataForGemini(location, weatherData);
      const geminiResponse = await callGeminiAPI(geminiPrompt);
      setItinerary(geminiResponse.data.itinerary);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for location, startDate, endDate */}
      <button type="submit">Generate Itinerary</button>
    </form>
  );
};

export default ItineraryForm;