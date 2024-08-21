# Trax AI

Trax AI is a Next.js application that allows users to select a location and date range to fetch weather data and generate a travel itinerary based on the weather conditions. The application uses the OpenWeatherMap API for weather data and the Gemini API for generating travel itineraries.

## Features

- **Location and Date Range Selection:** Users can choose a location and specify a start and end date.
- **Weather Forecast Retrieval:** Fetches 3-hour interval weather data for the selected date range from the OpenWeatherMap API.
- **Itinerary Generation:** Sends weather data and location to the Gemini API to create a detailed travel itinerary.
- **JSON Data Rendering:** Displays the generated itinerary and weather data in a structured JSON format.

## Setup

### Prerequisites

- Node.js and npm/yarn installed.
- API keys for OpenWeatherMap and Gemini.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/trax-ai.git
   cd trax-ai
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**

   Create a `.env.local` file in the root directory and add your API keys:

   ```env
   WEATHER_API_KEY=your_openweathermap_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the Application:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

## API Endpoints

### `/api/getWeatherReport`

**Method:** `POST`

**Description:** Fetches weather data for the specified location and date range.

**Request Body:**

```json
{
  "location": "Goa",
  "startDate": "2024-08-21",
  "endDate": "2024-08-30"
}
```

**Response:**

```json
[
  { "date": "2024-08-21", "weather": "Rain" },
  { "date": "2024-08-22", "weather": "Clouds" },
  ...
]
```

### `/api/getItinerary`

**Method:** `POST`

**Description:** Generates a travel itinerary based on location and weather data.

**Request Body:**

```json
{
  "location": "Goa",
  "weatherData": [
    { "date": "2024-08-21", "weather": "Rain" },
    { "date": "2024-08-22", "weather": "Clouds" },
    ...
  ]
}
```

**Response:** JSON formatted data with the travel itinerary.

## Usage

1. **Select Location and Dates:** Use the application interface to enter the desired location and date range.
2. **Submit the Form:** Click the submit button to fetch weather data and generate the itinerary.
3. **View Results:** The results will be displayed in JSON format, showing both weather data and the generated itinerary.

## Author

- **Arin Dewangan**

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/your-username/trax-ai).


---
