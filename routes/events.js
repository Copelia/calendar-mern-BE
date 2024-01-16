const { Router } = require('express');
const router = Router();
const { validateJWT } = require('../middlewares/jwt-validator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

/* Event Routes
  /api/events
*/

//Validar todas las peticiones
router.use(validateJWT);

//Obtener eventos

router.get('/', getEvents)

router.post(
  '/',
  [
    check('title', 'Mandatory title').not().isEmpty(),
    check('start', 'Date is mandatory').custom(isDate),
    check('end', 'Date is mandatory').custom(isDate),
    fieldValidator
  ],
  createEvent
)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router;