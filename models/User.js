const { Schema, model } = require('mongoose');

//como voy a grabar la data en db
const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model('User', UserSchema);
