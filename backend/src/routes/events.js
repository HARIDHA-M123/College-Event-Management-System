const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const { sendConfirmationEmail } = require('../utils/mailer');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name role');
    const counts = {};
    events.forEach((ev) => {
      if (ev.organizer && ev.organizer._id) {
        const id = ev.organizer._id.toString();
        counts[id] = (counts[id] || 0) + 1;
      }
    });
    const enriched = events.map((ev) => {
      const obj = ev.toObject({ getters: true });
      if (ev.organizer && ev.organizer._id) {
        obj.organizerEventsCount = counts[ev.organizer._id.toString()] || 0;
      } else {
        obj.organizerEventsCount = 0;
      }
      return obj;
    });
    res.json({ events: enriched });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id).populate('organizer', 'name role');
    if (!ev) return res.status(404).json({ message: 'Not found' });
    let organizerEventsCount = 0;
    if (ev.organizer && ev.organizer._id) {
      organizerEventsCount = await Event.countDocuments({ organizer: ev.organizer._id });
    }
    const obj = ev.toObject({ getters: true });
    obj.organizerEventsCount = organizerEventsCount;
    res.json({ event: obj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    if (!['organizer', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: organizer or admin only' });
    }
    const payload = req.body;
    payload.fee = typeof payload.fee !== 'undefined' ? Number(payload.fee) || 0 : 0;
    const ev = new Event({ ...payload, organizer: req.user._id });
    await ev.save();
    const io = req.app.get('io');
    io.emit('event:created', ev);
    res.json({ event: ev });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/attend', auth, async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    if (!ev.attendees.includes(req.user._id)) ev.attendees.push(req.user._id);
    await ev.save();
    const io = req.app.get('io');
    io.emit('event:attend', { eventId: ev._id, userId: req.user._id });
    if (req.user && req.user.email) {
      try {
        const r = await sendConfirmationEmail(
          req.user.email,
          `Registration confirmed: ${ev.title}`,
          `Hi ${req.user.name},\n\nYou are registered for ${ev.title} on ${ev.date}.\n\nSee you there!`
        );
        if (r && r.error) console.warn('Email send failed:', r.error && (r.error.message || r.error));
        else console.log('Email sent via', r.provider);
      } catch (err) {
        console.warn('Email send exception:', err && err.message);
      }
    }
    res.json({ event: ev });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/feedback', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    const rNum = Number(rating);
    if (!rNum || rNum < 1 || rNum > 5) {
      return res.status(400).json({ message: 'Rating must be 1-5' });
    }
    let canFeedback = false;
    if (ev.attendees.some((a) => a.toString() === req.user._id.toString())) canFeedback = true;
    if (ev.date) {
      const parts = ev.date.split('-');
      if (parts.length === 3) {
        const d = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
        if (Date.now() >= d.getTime()) canFeedback = true;
      }
    }
    if (!canFeedback) return res.status(403).json({ message: 'Feedback allowed only after attending or after event date' });
    ev.upsertFeedback(req.user._id, rNum, comment || '');
    await ev.save();
    const io = req.app.get('io');
    io.emit('event:feedback', { eventId: ev._id, averageRating: ev.averageRating });
    res.json({ message: 'Feedback saved', eventId: ev._id, averageRating: ev.averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id/feedback', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id).populate('feedback.user', 'name role');
    if (!ev) return res.status(404).json({ message: 'Not found' });
    res.json({ feedback: ev.feedback, averageRating: ev.averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
