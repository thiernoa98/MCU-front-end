import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../UrlConstant';
import { Link } from 'react-router-dom';


function AllCharacters() {
    const [serverData, setServerData] = useState([]);

    useEffect(()=>{
        axios.get(`${API_URL}/getAllactors`)
        .then(async (res)=>{
          //we execute the below code fetch only
          // const data = await res.json(); //geet data in json format

          // setServerData(res.data.payload);
          setServerData(res.data.payload) //we do this with axios.get
        })


    },[])
// console.log(serverData);


  return (
    <>
      <h1>Super Heroes</h1>
      {/* cheeck if data exists first */}
      {serverData.length ? serverData.map((actor)=>{
        return(
        <ul key={actor._id}>
          <li key={actor._id}>
            {/* the link to is from the app.js route */}
            <Link to={`/mcu/${actor.name}`} > {actor.name}</Link>          
          </li>
        </ul>)
      }) : <p>Loading...</p>

      }
    </>
  )
}

export default AllCharacters
