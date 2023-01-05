import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './historialUsuario.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar2 from '../navbar/navBar2';
import Compras from './compras.jsx'

const Prueba = () => {

    const [infoDeHistorial, setinfoDeHistorial] = useState([]);
    const { user } = useAuth0();
    

 useEffect(async ()=>{
 

///hacemos un peticion al back para obtener el id del usuario que inicion seion
    const idUser = await axios.post("http://localhost:3001/compras/obtenerId",{
        User: user.nickname
     })

  
///hacemos una peticion al back pasando el idUser y nos traemos todos lo productos 
///que ese usuario compro 
    const respuesta = await axios.post("http://localhost:3001/compras/historial",{
    clienteId: idUser.data
 });

 

//  console.log(respuesta.data);
///guardamos la informacion en nuestro estado local infoDeHistorial para luego mapearla
   setinfoDeHistorial(respuesta.data);

 
 },[])

 
 console.log(infoDeHistorial);
 return(
    <div>
       
        <Navbar2></Navbar2>

        <div className={style.divPadre}>

        <h2>historial de compras</h2>

        {infoDeHistorial.map((elem)=> {
 ///mapeamos toda la info que tenemos en el estado local infoDeHistorial
   
         return <Compras
             nombre={elem.nombre}
             URL={elem.URL}
             marca={elem.marca}
             fecha={elem.fecha}
             precio={elem.precio}
             talla={elem.talla}
             id={elem.id}
             enviado={elem.estado}
             key={elem.id}
             />
        })}
    </div>

    </div>
)
}



export default Prueba;