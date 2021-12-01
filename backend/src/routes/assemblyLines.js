const express = require('express');
const router = express.Router();
const assemblyLinesController = require('../controller/assemblyLines');
const assemblyLineRequestDto = require('./dto/assemblyLineRecordRequestDto');
const readAssemblyLineByNameDto = require('./dto/readAssemblyLineByNameDto');
const deleteAssemblyLineByNameDto = require('./dto/deleteAssemblyLineByNameDto');
const productRequestDto = require('./dto/productRecordRequestDto');
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
 * /assembly_lines/id/{id}:
 *      get:
 *          summary: get Assembly Line by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single Assembly Line object
 *
 */
router.get('/id/:id', assemblyLinesController.readAssemblyLine);

/**
 * @swagger
 * /assembly_lines/name/{assembly_line}:
 *      get:
 *          summary: get Assembly Line by name
 *          parameters:
 *              -   in: path
 *                  name: assembly_line
 *                  type: string
 *                  required: true
 *                  example: ALINE-1
 *          responses:
 *              200:
 *                  description: a single Assembly Line object
 *              400:
 *                  error
 *
 */
router.get('/name/:assembly_line', readAssemblyLineByNameDto, assemblyLinesController.readAssemblyLineByName);

/**
 * @swagger
 * /assembly_lines/name/{assembly_line}:
 *      delete:
 *          summary: delete Assembly Line by name
 *          parameters:
 *              -   in: path
 *                  name: assembly_line
 *                  type: string
 *                  required: true
 *                  example: ALINE-1
 *          responses:
 *              200:
 *                  description: deleted a single Assembly Line object
 *              400:
 *                  error
 *
 */
router.delete('/name/:assembly_line', deleteAssemblyLineByNameDto, assemblyLinesController.deleteAssemblyLineByName);

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
 * /assembly_lines/input/product:
 *  post:
 *      summary: add a product to the input
 *      requestBody:
 *       content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required: true
 *                    properties:
 *                       assemblyLineName:
 *                          type: string
 *                          example: ALINE-1
 *                       steps:
 *                          type: number
 *                          example: 1
 *                       prodName:
 *                          type: string
 *                          example: cogs
 *                       prodQuantity:
 *                          type: number
 *                          example: 1
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/input/product', productRequestDto, validateRequest, assemblyLinesController.addProductToInputBuffer);

module.exports = router;
