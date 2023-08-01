import React, { useState} from 'react';
import './App.css';

interface ForecastDataItem {
  name: string;
  detailedForecast: string;
}

const App = () => {

  const [address, setAddress] = useState<string>('');
  const [forecastData, setForecastData] = useState<ForecastDataItem[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the JSON data to be sent in the POST request
    const postData = {
      postAddress: address
    }

    // Make the API POST request
    fetch('http://localhost:5000/getWeather/retrieve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API here (if needed)
      setForecastData(data["data"]["properties"]["periods"]);
    })
    .catch((error) => {
      // Handle any error that occurred during the API request
      console.error('Error:', error);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)} 
        />
        <button type="submit">Get Weather</button>
      </form>

      {forecastData.map((forecastItem, index) => (
        <div key={index}>
          <p>Time: {forecastItem["name"]}</p>
          <p>{forecastItem["detailedForecast"]}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
