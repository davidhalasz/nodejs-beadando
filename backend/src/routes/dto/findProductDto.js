const { param } = require('express-validator');

module.exports = [
  param('assembly_line', 'The name of assembly line is required').exists(),
  param('step', 'The step number is invalid').isInt({ min: 1 }),
  param('prod_name', 'Product name is required').exists()
];
