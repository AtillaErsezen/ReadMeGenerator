import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>ReadMe Generator</h1>
      
        <div>
          <input type="text" placeholder="Enter repository url" />
          <button style={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }}>
            Generate!
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;