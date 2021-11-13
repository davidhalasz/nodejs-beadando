const { body } = require('express-validator');

module.exports = [
  body('name', 'The Assembly Line\'s name is required.').exists(),
  body('numberOfSteps', 'The Assembly Line\'s number of steps is required.').exists()
];
