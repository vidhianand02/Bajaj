import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post("https://your-backend-api-url.com/bfhl", parsedJson);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API Error");
    }
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (filter.includes("Alphabets")) filteredResponse["Alphabets"] = response.alphabets;
    if (filter.includes("Numbers")) filteredResponse["Numbers"] = response.numbers;
    if (filter.includes("Highest Lowercase Alphabet")) filteredResponse["Highest Lowercase Alphabet"] = response.highest_lowercase_alphabet;

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge</h1>
      <textarea
        rows="10"
        cols="50"
        placeholder='Enter JSON input: {"data": ["A", "1", "b"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleCheckboxChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleCheckboxChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest Lowercase Alphabet"
            onChange={handleCheckboxChange}
          />
          Highest Lowercase Alphabet
        </label>
      </div>

      {renderResponse()}
    </div>
  );
}

export default App;
