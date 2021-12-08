const { body } = require('express-validator');

module.exports = [
  body('assemblyLineName', 'There is no this name').exists(),
  body('steps').exists()
    .withMessage('The step number is not specified')
    .bail()
    .isInt({ min: 1 }),
  body('prodName', 'The product name is not specified').exists()
];
