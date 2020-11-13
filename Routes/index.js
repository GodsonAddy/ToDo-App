const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Todos = mongoose.model('Todos');

router.get('/', function (req, res) {
  // res.status(200).json(ToDoList)
  return Todos.find({})
    .then((todos) => {
      return res.status(200).json({ todos: todos });
    });
})

router.get('/:id', function (req, res) {
  const { id } = req.params;
  Todos.findById(id)
    .then(todo => {
      res.status(200).json(todo || {})
    })
})

router.post('/', function (req, res) {
  const payload = {
    content: req.body.content,
    _id: new mongoose.Types.ObjectId()
  }
  const item = new Todos(payload)
  item.save()
  res.status(201).json(item);
})

router.patch('/:id', function (req, res) {
  const { id } = req.params;
  const payload = {
    content: req.body.content
  }
  Todos.findByIdAndUpdate(id, payload)
    .then(
      (todo) => {
        res.status(201).json(todo);
      }
    )
    .catch(e => res.status(400).json({ _id: id, message: 'item not found' }))
})

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  Todos.findByIdAndDelete(id)
    .then(todo => {
      res.status(201).json({_id: id, message: 'item deleted successfully'});
    })
    .catch(e => res.status(400).json({_id: id, message: 'item not found'}))
})

module.exports = router;