import React, { useState } from 'react'
import '../App.css';
import { API_URL } from '../UrlConstant';
import { useNavigate } from 'react-router-dom';

function CreateActor() {
    const [name, setName] = useState('');
    const [debutFilm, setDebutFilm] = useState('');
    const [debutYear, setDebutYear] = useState(0);
    //have navigate, which eject to a diff page each time we submit
    const navigate = useNavigate('');

  async function postActor() {
    let newActor = {
        name,
        debutFilm,
        debutYear
    }

    //using fetch to get the create function from the back end
    fetch(`${API_URL}/creatActor`,{
        //like router.post to create something
        method: 'post',
        //remove the data from json fromat
        body: JSON.stringify(newActor),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(async (res)=>{
        //saving the file as json
        let serverResponse = await res.json();
        // console.log(serverResponse);

        //navigate to '/mcu/:name' page after we create it
        navigate(`/mcu/${serverResponse.payload.name}`)
    })

    //reset all after
    setName('');
    setDebutFilm('');
    setDebutYear(0)
  }

  //function that will create the new actor
  function handleOnSubmit(event) {
    event.preventDefault();

    postActor();
  }


  return (
    <div className='App'>
    <form onSubmit={(e)=> handleOnSubmit(e)}>
      <h2>Add here a new MCU Character </h2>

      <label>Name </label>
      <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
      <br/><br/>

      <label> Debut Film </label>
      <input type="text" value={debutFilm} onChange={(e)=> setDebutFilm(e.target.value)} />
      <br/><br/>

      <label htmlFor="">Debut Year </label>
      <input type="text" value={debutYear} onChange={(e)=> setDebutYear(e.target.value)}/>

      <button className='update-btn' type='submit'>create</button>
    </form>
    </div>
  )
}

export default CreateActor;
