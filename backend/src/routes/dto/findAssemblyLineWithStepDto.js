const { param } = require('express-validator');

module.exports = [
  param('step_number', 'The step is invalid').isInt({ min: 1 })
];
