const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodosSchema = new Schema(
  {
    _id: { type: String, required: true },
    content: {
      type: String,
      required: true
    }
  },{timestamps: true}
);

TodosSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    content: this.content
  };
};

mongoose.model('Todos', TodosSchema);