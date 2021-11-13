const AssemblyLine = require('../model/assemblyLine');
const assemblyLineState = require('../model/assemblyLineState');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/service.log'
    }),
    new winston.transports.Console()
  ]
});

const createAssemblyLine = ({ name, numberOfSteps }) => {
  return new Promise((resolve, reject) => {
    const step = {
      inputBuffer: [],
      outputBuffer: []
    };
    const assemblyLine = {
      name: name,
      steps: [...Array(parseInt(numberOfSteps)).keys()].map(() => step)
    };
    AssemblyLine.create(assemblyLine)
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const readAssemblyLines = () => {
  return new Promise((resolve, reject) => {
    AssemblyLine.find()
      .then((documents) => { resolve(documents); })
      .catch((err) => { reject(err); });
  });
};

const readAssemblyLinesById = (id) => {
  return new Promise((resolve, reject) => {
    AssemblyLine.findById(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`Issue Not Found with id: ${id}`);
        reject(err);
      });
  });
};

const changeSate = (id, state) => {
  return readAssemblyLinesById(id)
    .then(aline => {
      if (!isStateChangeAllowed(aline.state, state)) {
        logger.info(`Invalid State Change ${aline.state} => ${state}`);
        throw new Error({ msg: `Invalid State change ${aline.state} => ${state}` });
      }
      return aline;
    }).then(aline => {
      return AssemblyLine.findByIdAndUpdate(id, { state: state }, { new: true });
    });
};

const isStateChangeAllowed = (from, to) => {
  if (from === assemblyLineState.OPEN && to === assemblyLineState.IN_PROGRESS) return true;
  if (from === assemblyLineState.IN_PROGRESS && to === assemblyLineState.RESOLVED) return true;
  return from === assemblyLineState.RESOLVED && [assemblyLineState.IN_PROGRESS, assemblyLineState.CLOSED].includes(to);
};

const changeStateToInProgress = (id) => {
  return changeSate(id, assemblyLineState.IN_PROGRESS);
};
const changeStateToResolved = (id) => {
  return changeSate(id, assemblyLineState.RESOLVED);
};
const changeStateToClosed = (id) => {
  return changeSate(id, assemblyLineState.CLOSED);
};

module.exports = {
  createAssemblyLine: createAssemblyLine,
  readAssemblyLines: readAssemblyLines,
  readAssemblyLinesById: readAssemblyLinesById,
  changeStateToInProgress: changeStateToInProgress,
  changeStateToResolved: changeStateToResolved,
  changeStateToClosed: changeStateToClosed
};
