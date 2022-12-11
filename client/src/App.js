import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((data) => data.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
  );
}

export default App;
