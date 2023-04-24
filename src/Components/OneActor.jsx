import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../UrlConstant';
import "../App.css";

function OneActor() {
  const {name} = useParams();
  
  //we don't need the name:'', because we're using it
  const [actor, setActor] = useState({
    debutFilm: '',
    debutYear: 0
  });

  const [isEditing, setIsEditing] = useState(false);

  //useNavigate to eject to another page after a button is clicked
  const navigate = useNavigate('');

//if we editing, set it to false, else true
  function toggleEditing() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }

  //allow us to edit
  function updateActor({target}) {
    setActor((previousState)=> ({
        ...previousState,
        //target and change the value of the input
        [target.name]: target.value
    }))
  }


  //we do handleSubmit on forms
  function handleOnSubmit(event) {
    event.preventDefault();

    console.log('submitted');

    //save original data before update, if we cancel we don't lose data
    const sendBody = {
        debutFilm: actor.debutFilm,
        debutYear: actor.debutYear
    } ;

    fetch(`${API_URL}/updateActor/${actor._id}`, {
        //like router.put()
        method: 'put',
        //remove the data from json fromat
        body: JSON.stringify(sendBody),

        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(()=> setIsEditing(false)); //hide the save btn after save
  }

  // console.log(actor);

  //delete function
  function handleDelete() {
    fetch(`${API_URL}/deleteActor/${actor._id}`,
    {
      method:'delete',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }

    }).then(()=>{
      //eject to all characters with navigate
      navigate('/mcu');
    })
    
  }


  useEffect(()=>{
    fetch(`${API_URL}/getActorByName/${name}`, {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(async(res)=>{
        let result = await res.json();

        setActor(result.payload);
    })
    
  },[name, isEditing])


  return (
    <>
      <h1>The Actor Name is {name}</h1>
    <ul>
        <form onSubmit={handleOnSubmit}>
            <li>Debuted with The Movie
              {isEditing ? <input type='text' name='debutFilm' value={actor.debutFilm} onChange={updateActor}/>:
                <span> {actor.debutFilm}</span>
              }
            </li>
            <li>Debuted in 
              {isEditing ? <input type='text' name='debutYear' value={actor.debutYear} onChange={updateActor}/>:
               <span> {actor.debutYear}</span> 
              }
            </li><br/>
            
            {/* show this button only when editing */}
            {isEditing ?<button className='save-btn'>save update </button> : ''}

        </form>
    </ul>

    <button className='Edit-Can-btn' onClick={toggleEditing}>
        {
            isEditing ? 'Cancel': 'Edit Actor Details'
            
        }
    </button> {' '}

    <button className='delete-btn' onClick={handleDelete}>Delete Actor</button>
    </>
  )
}

export default OneActor


