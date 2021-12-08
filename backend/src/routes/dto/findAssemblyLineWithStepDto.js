const { param } = require('express-validator');

module.exports = [
  param('step_number', 'The step number is invalid').isInt({ min: 1 })
];
