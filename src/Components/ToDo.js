import React, {useState} from 'react';
import { TextField, Button, Typography, Toolbar} from '@material-ui/core';
import './../App.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      right: "10px",
      position: "absolute",
      cursor: "pointer",
      flexWrap: "nowrap"
    }
}));

const ToDo = () => {

    const [toDoList, setToDoList] = useState([]);
    const [userInput, setUserInput] = useState({todo: "", key: ""});
    const classes = useStyles();
   
    const handleChange = (event) => {
      setUserInput( {todo: event.target.value, key: Math.random()})
    }
  
    const handleClick = (event) => {
      event.preventDefault()
      
      const itemsArray = userInput
      if (itemsArray.todo !== "") {
          const newArray = [...toDoList, itemsArray]
          setToDoList(newArray)
          setUserInput({todo: "", key: ""})
        }
    }

    const deleteToDo = (key) => {
        const toggleDelete = toDoList.filter(i => i.key !== key)
        setToDoList(toggleDelete)
    }    
              
    const items = toDoList.map((i) => 
        <div className="todos" key={i.key}>
            
            <Toolbar>
                <p> {i.todo}</p>
                <IconButton aria-label="trash" 
                    color="secondary"  
                    className={classes.root} 
                    onClick={() => deleteToDo(i.key)}>

                    <DeleteForeverIcon />
                </IconButton>
            </Toolbar>

        </div>   
    )

    return (
        
        <div className='container'>
            <div>
                <TextField onChange={handleChange} 
                    value={userInput.todo} 
                    multiline
                    variant="outlined"
                    id="outlined-basic" label="ToDo"
                    fullWidth
                />

                <div style={{marginTop: '15px'}}>
                    <Button onClick={handleClick} variant="contained" color="primary" fullWidth>
                        Create List
                    </Button>
                </div>

            </div>

            <div>
                <Typography variant="h5">My List:</Typography>
                <div>{items}</div>
            </div>
            
            
        </div>
        
    )
}

export default ToDo;
