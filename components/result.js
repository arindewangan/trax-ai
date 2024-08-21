import React from 'react';

const Result = ({ itinerary }) => {
  console.log(itinerary);
  if (!itinerary) {
    return <div>No itinerary available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-5">
      <div className="items-center">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 text-center">Your Itinerary</h2>
        <h1 className="text-2xl font-bold mb-6 text-center">{itinerary.title}</h1>
        <div className="mb-4">
          <strong>Date Range:</strong> {itinerary.date_range.start_date} - {itinerary.date_range.end_date}
        </div>
        <div className="mb-6">
          <strong>Note:</strong> {itinerary.note}
        </div>
        {itinerary.days.map((day) => (
          <div key={day.day} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Day {day.day}: {day.title} ({day.date})</h2>
            {day.activities.map((activity, index) => (
              <div key={index} className="ml-4 mb-2">
                <strong>{activity.time}:</strong> {activity.description}
              </div>
            ))}
          </div>
        ))}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Additional Tips</h3>
          <ul className="list-disc list-inside">
            {itinerary.additional_tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex items-center justify-center text-center mt-4 mb-2'>

      <button onClick={() => window.print()} className="printbutton bg-yellow-300 text-yellow-900 py-2 px-4 rounded shadow hover:shadow-xl hover:bg-yellow-300 duration-300">Print Itinerary</button>
      </div>
      </div>
    </div>
  );
};

export default Result;
