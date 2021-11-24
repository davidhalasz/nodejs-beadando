const { param } = require('express-validator');

module.exports = [
  param('assembly_line', 'The Assembly Line\'s name is required.').exists()
];
