// Para crear colección en db y tener estructura de datos

const { Schema, model } = require('mongoose');

//como voy a grabar la data en db
const EventSchema = Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    // referencia para mongoose
    type: Schema.Types.ObjectId,
    //nombre del otro esquema
    ref: 'User',
    required: true
  }
});

EventSchema.method('toJSON', function(){
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Event', EventSchema);
