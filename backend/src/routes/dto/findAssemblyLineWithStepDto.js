const { param } = require('express-validator');

module.exports = [
  param('assembly_line', 'The name of assembly line is required').exists(),
  param('step', 'The step is invalid').isInt({ min: 1 })
];