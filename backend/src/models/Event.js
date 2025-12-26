const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: String,
  // Original date kept as string (expected format YYYY-MM-DD)
  date: String,
  startTime: String,
  endTime: String,
  type: String,
  department: String,
  popularity: { type: Number, default: 0 },
  image: String,
  location: String,
  fee: { type: Number, default: 0 },
  tags: [String],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  // Expiry timestamp: document removed automatically by MongoDB TTL index when reached.
  expiresAt: { type: Date, index: { expires: 0 } },
  feedback: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  averageRating: { type: Number, default: 0 }
});

function computePopularityFor(evDoc) {
  try {
    const attendeesCount = Array.isArray(evDoc.attendees) ? evDoc.attendees.length : 0;
    const ratingScore = (Number(evDoc.averageRating) || 0) * 20; // 0-100
    let recencyBoost = 0;
    if (evDoc.date && typeof evDoc.date === 'string') {
      const parts = evDoc.date.split('-');
      if (parts.length === 3) {
        const d = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
        const now = new Date();
        const dayMs = 24 * 60 * 60 * 1000;
        const daysAway = Math.floor((d.getTime() - now.getTime()) / dayMs);
        if (daysAway >= 0) {
          recencyBoost = Math.max(0, 30 - daysAway) * 2; // up to +60
        } else {
          recencyBoost = Math.max(0, 14 - Math.abs(daysAway)); // up to +14
        }
      }
    }
    const popularity = attendeesCount * 5 + ratingScore + recencyBoost;
    return Math.max(0, Math.min(10000, Math.round(popularity)));
  } catch (e) {
    return Number(evDoc.popularity) || 0;
  }
}

// Pre-save hook to set expiresAt if not already set.
EventSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    // Retention days after the event date (default 6 days)
    const retentionDays = Number(process.env.EVENT_RETENTION_DAYS) || 6;
    if (this.date) {
      // Parse date string (expected YYYY-MM-DD). Fallback: use createdAt.
      const parts = this.date.split('-');
      let baseDate;
      if (parts.length === 3) {
        const year = Number(parts[0]);
        const month = Number(parts[1]) - 1; // JS months 0-11
        const day = Number(parts[2]);
        baseDate = new Date(Date.UTC(year, month, day));
      } else {
        baseDate = this.createdAt || new Date();
      }
      // Add retention days
      const ms = retentionDays * 24 * 60 * 60 * 1000;
      this.expiresAt = new Date(baseDate.getTime() + ms);
    } else {
      // If no date provided, fall back to createdAt + retention
      const ms = (Number(process.env.EVENT_RETENTION_DAYS) || 6) * 24 * 60 * 60 * 1000;
      this.expiresAt = new Date((this.createdAt || new Date()).getTime() + ms);
    }
  }
  // Recalculate averageRating if feedback changed
  if (this.isModified('feedback')) {
    if (this.feedback && this.feedback.length) {
      const sum = this.feedback.reduce((acc, f) => acc + (f.rating || 0), 0);
      this.averageRating = Number((sum / this.feedback.length).toFixed(2));
    } else {
      this.averageRating = 0;
    }
  }

  // Recalculate popularity on create or when inputs change
  if (this.isNew || this.isModified('attendees') || this.isModified('feedback') || this.isModified('date')) {
    this.popularity = computePopularityFor(this);
  }
  next();
});

// Helper method to add or update a user's feedback entry
EventSchema.methods.upsertFeedback = function(userId, rating, comment) {
  let entry = this.feedback.find(f => f.user && f.user.toString() === userId.toString());
  if (entry) {
    entry.rating = rating;
    entry.comment = comment;
    entry.createdAt = new Date();
  } else {
    this.feedback.push({ user: userId, rating, comment });
  }
  // Force mark modified for average recompute
  this.markModified('feedback');
};

module.exports = mongoose.model('Event', EventSchema);
