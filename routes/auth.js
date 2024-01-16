// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post(
  '/new',
  [
    check('name', 'nombre obligatorio').not().isEmpty(),
    check('email', 'email obligatorio').isEmail(),
    check('password', 'pass obligatorio y de 6 caracteres').isLength({min: 6}),
    fieldValidator
  ],
  createUser
  );

router.post(
  '/',
  [
    check('email', 'email obligatorio').isEmail(),
    check('password', 'pass obligatorio y de 6 caracteres').isLength({min: 6}),
    fieldValidator
  ],
  loginUser
  );

router.get('/renew', validateJWT, renewToken);

module.exports = router;
