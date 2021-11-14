const express = require('express');
const router = express.Router();
const assemblyLinesController = require('../controller/assemblyLines');
const assemblyLineRequestDto = require('./dto/assemblyLineRecordRequestDto');
const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors);
    return;
  }
  next();
};

/**
 * @swagger
 * /assembly_lines:
 *  get:
 *      summary: Fetches all Assembly Lines
 *      responses:
 *          200:
 *              description: list of Assembly Lines
 */
router.get('/', assemblyLinesController.readAssemblyLines);

/**
 * @swagger
 * /assembly_lines/{id}:
 *      get:
 *          summary: get issue by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single issue object
 *
 */
router.get('/:id', assemblyLinesController.readAssemblyLine);

/**
 * @swagger
 * /assembly_lines:
 *  post:
 *      summary: create a new issue
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                          example: Assembly Line 1
 *                      numberOfSteps:
 *                          type: Number
 *                          example: 1
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/', assemblyLineRequestDto, validateRequest, assemblyLinesController.createAssemblyLine);

/**
 * @swagger
 * /issues/{id}/in-progress:
 *     put:
 *          summary: set issue to "in progress" state
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single issue object
 *              400:
 *                  description: error object
 *
 */
router.put('/:id/in-progress', assemblyLinesController.stateChangeToInProgress);

/**
 * @swagger
 * /issues/{id}/resolve:
 *      put:
 *          summary: get issue by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single issue object
 *              400:
 *                  description: error object
 */
router.put('/:id/resolve', assemblyLinesController.stateChangeToResolved);
/**
 * @swagger
 * /issues/{id}/close:
 *      put:
 *          summary: get issue by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single issue object
 *              400:
 *                  description: error object
 *
 */
router.put('/:id/close', assemblyLinesController.stateChangeToClosed);

module.exports = router;
