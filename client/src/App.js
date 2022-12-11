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
      <h1>eCommerce</h1>
    </div>
  );
}

export default App;
