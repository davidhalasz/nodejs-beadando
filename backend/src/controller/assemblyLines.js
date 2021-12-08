const { validationResult } = require('express-validator');
const service = require('../service/assemblyLines');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/controller.log'
    }),
    new winston.transports.Console()
  ]
});

exports.createAssemblyLine = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createAssemblyLine(req.body)
    .then(issue => res.send(issue)).catch(err => res.status(400).send(err));
};

exports.readAssemblyLines = (req, res, next) => {
  service.readAssemblyLines()
    .then(assemblyLines => res.send(assemblyLines))
    .catch(err => res.send({ error: err }));
};

exports.readAssemblyLineByName = (req, res, next) => {
  service.readAssemblyLineByName(req.params.assembly_line)
    .then(assemblyLine => res.send(assemblyLine === null ? {} : assemblyLine))
    .catch(err => res.send({ error: err }));
};

exports.deleteAssemblyLineByName = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.deleteAssemblyLineByName(req.params.assembly_line)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.send({ error: err }));
};

exports.addProductToInputBuffer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.addToInputBuffer(req.body)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.status(400).send({ error: err }));
};

exports.updateProductInInputBuffer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.updateProductInInputBuffer(req.body)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.status(400).send({ error: err }));
};

exports.deleteProductFromInputBuffer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.deleteProductFromInputBuffer(req.body)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.status(400).send({ error: err }));
};

exports.addProductToOutputBuffer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.addToOutputBuffer(req.body)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.status(400).send({ error: err }));
};

exports.updateProductInOutputBuffer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.updateProductInOutputBuffer(req.body)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.status(400).send({ error: err }));
};

exports.deleteProductFromOutputBuffer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    logger.info('Validation error');
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.deleteProductFromOutputBuffer(req.body)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.status(400).send({ error: err }));
};
