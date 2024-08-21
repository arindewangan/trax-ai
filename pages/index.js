import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Result from '@/components/result';

export default function Home() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      const weatherResponse = await axios.post('/api/getWeatherReport', {
        location,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      if (weatherResponse.status === 200) {
        const weatherData = weatherResponse.data;

        const prompt = formatDataForGemini(location, weatherData);
        const itineraryResponse = await axios.post('/api/getItinerary', {
          prompt,
        });

        console.log('Raw response:', itineraryResponse);

        if (itineraryResponse.status === 200) {
          const jsonString = await itineraryResponse.data.replace(/```json|```/g, '');
          const idata = await JSON.parse(jsonString);
          setItinerary(idata);
        } else {
          setError('Failed to generate itinerary');
        }
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error during submit:', error);
      setError('An error occurred while generating itinerary');
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);

    const maxEndDate = new Date(date);
    maxEndDate.setDate(maxEndDate.getDate() + 5);

    if (endDate > maxEndDate) {
      setEndDate(maxEndDate);
    } else if (endDate < date) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(maxEndDate.getDate() + 5);
      setEndDate(date > maxEndDate ? maxEndDate : date);
    } else {
      setEndDate(startDate);
    }
  };

  return (
    <div>
      {!itinerary ? (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Plan Your Dream Tour with Trax AI</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your destination"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minDate={startDate}
                  maxDate={new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Generate Itinerary
              </button>
            </form>

            {error && (
              <div className="mt-6 text-red-600 text-center">{error}</div>
            )}

          </div>
        </div>
        ):(
        <div>
          <Result itinerary={itinerary} />
        </div>
      )}
    </div>
  );
}

const outputFormat = {
  "title": "Trip Itinerary",
  "date_range": {
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD"
  },
  "note": "General note about the itinerary.",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Title of the Day",
      "activities": [
        {
          "time": "Time of Day",
          "description": "Description of the activity."
        }
      ]
    }
  ],
  "additional_tips": [
    "Tip 1: Description of the tip."
  ]
}

const formatDataForGemini = (location, weatherData) => {
  const prompt = `Create a detailed itinerary for a trip to ${location} based on the following weather data: ${JSON.stringify(weatherData)}, return only in json format - ${JSON.stringify(outputFormat)}`;
  return prompt;
};
