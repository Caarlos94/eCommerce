import React, { useEffect, useState } from 'react';
import Navbar2 from '../navbar/navBar2.jsx';
import axios from 'axios';
import style from './superAdmin.module.css';
// import Admins from './Admins.j'
import { Link } from 'react-router-dom';
import { element } from 'prop-types';
import e from 'cors';

const SuperAdmin = (props) => {

    const [deleteAdmins, DeleteAdmins] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(async() => {

        // const admins = '';
       const result = await axios.get('http://localhost:3001/superAdmin/fetchRoles')
      
       setAdmins(result.data);
  
       console.log(result.data);
      
    },[])



    const deleteAd = (params)=>{
      DeleteAdmins([...deleteAdmins, params ]);
    }



   const Delete = async() => {
    // console.log(deleteAdmins);
    const adminsdeletes = await axios.post('http://localhost:3001/superAdmin/removeAdmin',deleteAdmins)

    if(adminsdeletes.data){
      setTimeout(async() => {
        const result = await axios.get('http://localhost:3001/superAdmin/fetchRoles')
        
        setAdmins(result.data);     
      }, 100);
    }
 }

 
     return (
          <div className={style.divPadre} >
            <Navbar2></Navbar2>
             <div className={style.divAdmins}>
               <h2>usuarios con rol admin</h2>
               <div>
                  {
                    admins?.map((element) => {
                     return <div className={style.admin} key={element.user_id}>
                         <h5 >{element.email}</h5>
                         <h5>{element.idEmail}</h5>
                         <button onClick={() => deleteAd(element.user_id)} className={style.buttonAdmins}>eliminar admin</button>
                     </div>
                    })
                  }
                  <button onClick={() => Delete()} className={style.admins}>delete admins</button>
               </div>
             </div>

          </div>
     )
}

export default SuperAdmin;