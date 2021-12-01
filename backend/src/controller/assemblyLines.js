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
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createAssemblyLine(req.body).then(issue => res.send(issue)).catch(err => res.status(400).send(err));
};

exports.readAssemblyLines = (req, res, next) => {
  service.readAssemblyLines()
    .then(assemblyLines => res.send(assemblyLines))
    .catch(err => res.send({ error: err }));
};

exports.readAssemblyLine = (req, res, next) => {
  /*
  if (req.params.id === undefined) {
    service.createAssemblyLine()
      .then(issues => res.send(issues))
      .catch(err => res.send({ error: err }));
    return;
  }
  */
  service.readAssemblyLinesById(req.params.id)
    .then(assemblyLine => res.send(assemblyLine === null ? {} : assemblyLine))
    .catch(err => res.send({ error: err }));
};

exports.readAssemblyLineByName = (req, res, next) => {
  service.readAssemblyLineByName(req.params.assembly_line)
    .then(assemblyLine => res.send(assemblyLine === null ? {} : assemblyLine))
    .catch(err => res.send({ error: err }));
};

exports.deleteAssemblyLineByName = (req, res, next) => {
  service.deleteAssemblyLineByName(req.params.assembly_line)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.send({ error: err }));
};

exports.addProductToInputBuffer = (req, res, next) => {
  service.addToInputBuffer(req.body)
    .then(assemblyLine => res.send(assemblyLine))
    .catch(err => res.status(400).send({ error: err }));
};
