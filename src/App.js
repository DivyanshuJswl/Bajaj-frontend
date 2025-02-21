// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import CSS file

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Options for the multi-select dropdown
  const options = [
    { label: 'Alphabets', value: 'alphabets' },
    { label: 'Numbers', value: 'numbers' },
    { label: 'Highest alphabet', value: 'highest_alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('https://bajajbackend-brown.vercel.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput)
      });
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      setError('Invalid JSON input or network error.');
      console.error(err);
    }
  };

  const handleSelectChange = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(values);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    return (
      <div className="response-box">
        {selectedOptions.map(option => (
          <div key={option} className="response-item">
            <strong>{option}:</strong> {JSON.stringify(responseData[option])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Bajaj - Send Data</h1>
      <h1 className="title">Made by - Divyanshu Jaiswal</h1>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          rows="5"
          cols="50"
          className="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON e.g. { "data": ["A", "C", "z"] }'
        />
        <br />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {responseData && (
        <div className="response-section">
          <h2>Response</h2>
          <div className="dropdown-container">
            <label>Select Options:</label>
            <br />
            <select multiple className="dropdown" onChange={handleSelectChange}>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
