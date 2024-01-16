const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

  const events = await Event.find()
                            .populate('user', 'name');

  res.json({
    ok: true,
    events
  })
};

const createEvent = async (req, res) => {

  const event = new Event(req.body);

  try{
    event.user = req.uid

    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent
    });

  } catch(err){
    res.status(500).json({
      ok: false,
      msg: 'Contact the admin'
    })
  }

};

const updateEvent = async(req, res) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try{

    const event = await Event.findById(eventId);

    if(!event){
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist'
      });
    }

    if(event.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'Does not have permission to edit this event'
      });
    }

    const newEvent = {
      ...req.body,
      users: uid
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

    res.json({
      ok: true,
      event: updatedEvent
    });

  } catch(err){
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Contact the admin'
    });
  }

};

const deleteEvent = async(req, res) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try{

    const event = await Event.findById(eventId);

    if(!event){
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist'
      });
    }

    if(event.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'Does not have permission to edit this event'
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true
    });

  } catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the admin'
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}
