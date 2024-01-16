
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jws');

const createUser = async (req, res) => {

  const { email, password } = req.body;

  try{
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({
        ok: false,
        msg: 'The user already exists'
      });
    };

    user = new User(req.body);

    //encriptacion de contra de una sola via
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    });
  }
};

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        ok: false,
        msg: 'The email does not match'
      });
    };

    //confirmar password
    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect password'
      });
    }

    //generar JWT
    const token = await generateJWT(user.id, user.name);


    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })


  } catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    });
  }
};

const renewToken = async (req, res) => {

  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token
  })
};

module.exports = {
  createUser,
  loginUser,
  renewToken
}
