// source file: https://github.com/ahmad-ali14/siteViews-counter/blob/master/models/visits.js

const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const visitSchema = new mongoose.Schema({

  page:{
    type: String,
    required: true
  },
  counter:{
      type: Number,
      required: true
  }
}, schemaOptions);

const visits = mongoose.model('visits', visitSchema);

module.exports = visits;
