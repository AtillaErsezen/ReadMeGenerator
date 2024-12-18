import React, { useState } from 'react';
import './App.css';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: false,
  });

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [gptAnswer, setGptAnswer] = useState('');

  // Function to handle submit button
  const handleSubmit = () => {
    setSubmittedValue(inputValue);
    generateReadMe(submittedValue);
  };

  const generateReadMe = async (url) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system",
            content: "You are a github expert. Your task is to generate README files for given public repository urls."
          },
          {
            role: "user",
            content: `Generate a README file for this public repository: ${url}`
          }
        ]
      });
      setGptAnswer(response.choices[0].message.content);
    } catch (error) {
      console.error('Error generating README:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ReadMe Generator</h1>
        <div>
          <input
            type="text"
            placeholder="Enter repository url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            style={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }}
            onClick={handleSubmit}
          >
            Generate!
          </button>
        </div>
  
        {gptAnswer && (
          <div style={{ marginTop: '10px' }}>
            <textarea value={gptAnswer} readOnly rows="10" cols="50" />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
