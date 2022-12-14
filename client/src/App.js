import "./App.css";
import ProductCreate from "./componentes/ProductCreate/ProductCreate";
import Home from "./componentes/home/home.jsx";
import Details from "./componentes/details/details";
import { Route } from "react-router-dom";

/*import { useEffect } from "react";


  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((data) => data.json())
      .then((data) => console.log(data));
  }, []); */

function App() {
  return (
    <div>
      <button onClick={handleBuy}>BUY</button>
      <Route exact path="/" component={Home} />
      <Route path="/product" component={ProductCreate} />
      <Route path="/details/:id" component={Details} />
    </div>
  );
}

export default App;
