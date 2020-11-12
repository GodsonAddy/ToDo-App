var express = require('express');
var router = express.Router();
const uuid = require("uuid");

var ToDoList = [];

router.get('/', function (req, res) {
    res.status(200).json(ToDoList)
})

router.get('/:id', function (req, res) {
  const {id} = req.params;
  const select = ToDoList.find(list => list.id === id);
  if(select) {
        ToDoList = ToDoList.filter(list => list.id === id);
        res.status(200).json(select)
    } else {
      res.status(400).json({msg: `Can't find ${req.params}`})
    }
})

router.post('/', function (req, res) {
    const newToDo = {
        todo: req.body.todo,
        id: uuid.v4()
    }
    ToDoList.push(newToDo)
    res.status(201).json(newToDo)
})

router.delete('/:id', function (req, res) {
    const {id} = req.params;
    const deleted = ToDoList.find(list => list.id === id);
    if(deleted) {
        ToDoList = ToDoList.filter(list => list.id !== id);
        res.status(200).json(ToDoList)
    } else {
        res.status(400).json({msg: "What you're looking for is not available at the moment"})
    }


})

module.exports = router;