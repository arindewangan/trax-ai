import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { location, startDate, endDate } = req.body;
    const apiKey = process.env.WEATHER_API_KEY;

    try {
      // Ensure startDate and endDate are in the correct format
      const startDateString = new Date(startDate).toISOString().split('T')[0];
      const endDateString = new Date(endDate).toISOString().split('T')[0];

      // Calculate the number of days between start and end dates
      const daysDiff = Math.ceil((new Date(endDateString) - new Date(startDateString)) / (1000 * 60 * 60 * 24)) + 1; // +1 to include end date

      // Fetch weather data from OpenWeatherMap
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: location,
          cnt: daysDiff * 8, // OpenWeatherMap returns 3-hour intervals, so 8 intervals per day
          appid: apiKey,
          units: 'metric',
        },
      });

      // Process and filter weather data
      const weatherData = response.data.list
        .filter((item) => {
          const itemDate = item.dt_txt.split(' ')[0];
          return itemDate >= startDateString && itemDate <= endDateString;
        })
        .map((item) => ({
          date: item.dt_txt.split(' ')[0],
          weather: item.weather[0].main,
        }));

      res.status(200).json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
