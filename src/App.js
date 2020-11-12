import React, {useContext} from 'react';
import ToDo from './Components/ToDo';
import Appbar from './Components/Appbar';
import {ThemeContext} from './Components/Darkmode';



function App() {
  const { switched} = useContext(ThemeContext);
 
  return (
    <div>

      <main style={{backgroundColor: switched.background, color: switched.color}}>

        <Appbar/>
        <ToDo />
        
      </main>    
    
    </div>
  );
}



export default App;
