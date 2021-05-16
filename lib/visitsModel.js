// source file: https://github.com/ahmad-ali14/siteViews-counter/blob/master/models/visits.js

const mongoose = require('mongoose');
const schema = mongoose.schema;

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const visitScema = new schema({

  page:{
    type: String,
    required: true
  },
  counter:{
      type: Number,
      required: true
  }
}, schemaOptions);

const visits = moingoose.model('visits', visitScema, 'visits');

module.exports = visits;
