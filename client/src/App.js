import './App.css';
import Navbar from './componentes/navbar/navbar.jsx';
import Home from './componentes/home/home.jsx'


import { Route } from 'react-router-dom';

function App() {
  return (
    <div>

    

      <Route path='/' component={Navbar} />

      
      <Home/>
   
  
    </div>   
 
  );
}

export default App;
