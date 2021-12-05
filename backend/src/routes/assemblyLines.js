const express = require('express');
const router = express.Router();
const assemblyLinesController = require('../controller/assemblyLines');
const assemblyLineRequestDto = require('./dto/assemblyLineRecordRequestDto');
const readAssemblyLineByNameDto = require('./dto/readAssemblyLineByNameDto');
const deleteAssemblyLineByNameDto = require('./dto/deleteAssemblyLineByNameDto');
const productRequestDto = require('./dto/productRecordRequestDto');
const findAssemblyLineDto = require('./dto/findAssemblyLineWithStepDto');
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
 * /assembly_lines/{assembly_line}:
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
 *                  description: error
 *
 */
router.get('/:assembly_line', readAssemblyLineByNameDto, assemblyLinesController.readAssemblyLineByName);

/**
 * @swagger
 * /assembly_lines/{assembly_line}:
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
 *                  description: error
 *
 */
router.delete('/:assembly_line', deleteAssemblyLineByNameDto, assemblyLinesController.deleteAssemblyLineByName);

/**
 * @swagger
 * /assembly_lines:
 *  post:
 *      summary: create a new assembly line
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                          example: ALINE-1
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
 *      summary: add a product to the input buffer
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

/**
 * @swagger
 * /assembly_lines/output/product:
 *  post:
 *      summary: add a product to the output buffer
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
router.post('/output/product', productRequestDto, validateRequest, assemblyLinesController.addProductToOutputBuffer);

/**
 * @swagger
 * /assembly_lines/{assembly_line}/{step}:
 *      get:
 *          summary: get the status of the assembly line
 *          parameters:
 *              -   in: path
 *                  name: assembly_line
 *                  type: string
 *                  required: true
 *                  example: ALINE-1
 *              -   in: path
 *                  name: step
 *                  type: number
 *                  required: true
 *                  example: 1
 *          responses:
 *              200:
 *                  description: status of the assembly line
 *              400:
 *                  description: problem
 *
 */
router.get('/:assembly_line/:step', findAssemblyLineDto, assemblyLinesController.readAssemblyLine);

module.exports = router;
