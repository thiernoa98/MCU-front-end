import './App.css';
import AllCharacters from './Components/AllCharacters';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import CreateActor from './Components/CreateActor';
import OneActor from './Components/OneActor';


function App() {
  return (
    <div className="">
      <h1>This is an MCU app, you can see the year each super hero had debut their film</h1>
      <ul>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/mcu' >see all characters</Link></li>
        <li><Link to='/mcu/create' >add a new mcu actor</Link></li>
      </ul>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/mcu' element={<AllCharacters />}/>
        <Route path='/mcu/create' element={<CreateActor />}/>
        <Route path='/mcu/:name' element={<OneActor />}/>
      </Routes>
    </div>
  );
}

export default App;
