const mongoose = require('mongoose');

const AssemblyLineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  steps: {
    type: [{
      inputBuffer: {
        type: [
          {
            name: {
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              default: 0
            }
          }],
        required: true
      },
      outputBuffer: {
        type: [
          {
            name: {
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              default: 0
            }
          }],
        required: true
      }
    }],
    required: true
  }
});

AssemblyLineSchema.pre('findOneAndUpdate', next => {
  console.log('pre update hook');
  next();
});

module.exports = mongoose.model('assemblyLine', AssemblyLineSchema);
