import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Toolbar} from '@material-ui/core';
import './../App.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import BorderColorIcon from '@material-ui/icons/BorderColor';


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
  const [userInput, setUserInput] = useState({content: "", id: undefined});
  const classes = useStyles();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('')
   
  useEffect(() => {
    axios.get('http://localhost:8000/api/todos')
    .then(res => {
      console.log({ res })
      setToDoList(res.data.todos)
      setError('')
    })
    .catch(err => { 
      setError(err.toString())
      })
  }, [])
    
  const handleChange = (event) => {
    setUserInput( {...userInput, content: event.target.value})
  }

  const editItem = (item) => {
    setUserInput({ content: item.content, id: item._id })
  }

  const handleClick = (event) => {
    event.preventDefault()
    
    if (userInput.content && userInput.content.trim().length > 0) {
      if (userInput.id) {
        // edits post with id
        axios.patch(`http://localhost:8000/api/todos/${userInput.id}`, { content: userInput.content })
        .then((res) => {
          const newTodos = [...toDoList]
          const index = newTodos.findIndex(todo => todo._id === userInput.id);
          newTodos[index] = { _id: userInput.id, content: userInput.content }
          setToDoList(newTodos);
          setUserInput({ content: "" });
          setError('')
          setSuccess('Todo updated successfully!')
        })
        .catch(err => {
          setError('Can not update')
          setSuccess('')
          console.log({ err })
        })
    
      } else {
        // creates new post
        axios.post('http://localhost:8000/api/todos', { content: userInput.content })
        .then((res) => {
          const newTodo = [...toDoList, res.data]
          setToDoList(newTodo);
          setUserInput({ content: "" });
          console.log({ res })
          setError('')
          setSuccess('Todo added successfully!')
        })
        .catch(err => {
          setError('Can not save')
          setSuccess('')
          console.log({ err })
        })
      }
    }
    else {
      setError('Can not be empty')
      setSuccess('')
    }
  }
  
  const deleteToDo = (id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}`, { id })
    .then(_ => {
      const toggleDelete = toDoList.filter(i => i._id !== id)
      setToDoList(toggleDelete)
      setError('')
      setSuccess('Todo deleted successfully')
    })
    .catch( e => {
      setError(e.toString())
      setSuccess('')
    })
          
  }    
             
  const items = toDoList.map((i) => 
    <div className="todos" key={i._id}>
            
      <Toolbar>
        <p> {i.content}</p>
        <IconButton 
          aria-label="trash" 
          color="secondary"  
          className={classes.root} 
          onClick={() => deleteToDo(i._id)}>

          <DeleteForeverIcon />
        </IconButton>
        <IconButton color='primary' onClick={() => editItem(i)}>
          <BorderColorIcon style={{ color: 'white' }} />
        </IconButton>
    </Toolbar>

    </div>   
  )

  return (
        
    <div className='container'>
      <div className='messages'>
        {error && 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>}
        { success &&
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>}
      </div>

      <div>
        <TextField onChange={handleChange} 
          value={userInput.content} 
          multiline
          required
          variant="outlined"
          id="outlined-basic" label="ToDo"
          fullWidth
        />

        <div style={{marginTop: '15px'}}>
          <Button onClick={handleClick} variant="contained" color="primary" fullWidth>
            {userInput.id ? 'Update Todo': 'Create List' }
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
