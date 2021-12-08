const AssemblyLine = require('../model/assemblyLine');
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
        logger.info('Assembly Line has been created.');
      })
      .catch((err) => { reject(err); });
  });
};

const readAssemblyLines = () => {
  return new Promise((resolve, reject) => {
    AssemblyLine.find()
      .then((documents) => {
        logger.info('Read all Assembly Lines');
        resolve(documents);
      })
      .catch((err) => { reject(err); });
  });
};

const readAssemblyLineByName = (assemblyLineName) => {
  return new Promise((resolve, reject) => {
    AssemblyLine.find({ name: assemblyLineName })
      .then((documents) => {
        logger.info('Assembly Line has been found by Name.');
        resolve(documents);
      })
      .catch((err) => {
        logger.error(
            `Assembly Line Not Found with name: ${assemblyLineName}`
        );
        reject(err);
      });
  });
};

const deleteAssemblyLineByName = (assemblyLineName) => {
  return new Promise((resolve, reject) => {
    AssemblyLine.findOneAndDelete({ name: assemblyLineName })
      .then((documents) => {
        logger.info('Assembly Line has been deleted.');
        resolve(documents);
      })
      .catch((err) => {
        logger.error(
            `Assembly Line Not Found with name: ${assemblyLineName}`
        );
        reject(err);
      });
  });
};

const addToInputBuffer = ({
  assemblyLineName, steps,
  prodName, prodQuantity
}) => {
  return new Promise((resolve, reject) => {
    const filter = { name: assemblyLineName };
    const update = { prodName: prodName, prodQuantity: prodQuantity };
    AssemblyLine.findOneAndUpdate(filter, {
      $push: {
        [`steps.${steps - 1}.inputBuffer`]: update
      }
    }, { new: true }).then((documents) => {
      resolve(documents);
    }).catch((err) => {
      logger.error('Adding product to input buffer is not success');
      reject(err);
    });
  });
};

const updateProductInInputBuffer = ({
  assemblyLineName, steps,
  prodName, prodQuantity
}) => {
  return new Promise((resolve, reject) => {
    const filter = { name: assemblyLineName };
    AssemblyLine.findOneAndUpdate(filter, {
      $set: {
        [`steps.${steps - 1}.inputBuffer.$[prod].prodQuantity`]: prodQuantity
      }
    }, {
      new: true,
      arrayFilters: [
        {
          'prod.prodName': prodName
        }
      ]
    }).then((documents) => {
      logger.info('Product has been updated in input buffer');
      resolve(documents);
    }).catch((err) => {
      logger.error('Update product in input buffer is not success');
      reject(err);
    });
  });
};

const deleteProductFromInputBuffer = ({
  assemblyLineName, steps,
  prodName
}) => {
  return new Promise((resolve, reject) => {
    const filter = { name: assemblyLineName };
    AssemblyLine.findOneAndUpdate(filter, {
      $pull: {
        [`steps.${steps - 1}.inputBuffer`]: { prodName: prodName }
      }
    }, {
      new: true
    }).then((documents) => {
      logger.info('Product has been deleted from input buffer');
      resolve(documents);
    }).catch((err) => {
      logger.error('Deleting product from input buffer is not success');
      reject(err);
    });
  });
};

const addToOutputBuffer = ({
  assemblyLineName, steps,
  prodName, prodQuantity
}) => {
  return new Promise((resolve, reject) => {
    const filter = { name: assemblyLineName };
    const update = { prodName: prodName, prodQuantity: prodQuantity };
    AssemblyLine.findOneAndUpdate(filter, {
      $push: {
        [`steps.${steps - 1}.outputBuffer`]: update
      }
    }, { new: true }).then((documents) => {
      resolve(documents);
    }).catch((err) => {
      logger.info('Adding product to output buffer is not success');
      reject(err);
    });
  });
};

const updateProductInOutputBuffer = ({
  assemblyLineName, steps,
  prodName, prodQuantity
}) => {
  return new Promise((resolve, reject) => {
    const filter = { name: assemblyLineName };
    const update = { prodName: prodName, prodQuantity: prodQuantity };
    AssemblyLine.findOneAndUpdate(filter, {
      $set: {
        [`steps.${steps - 1}.outputBuffer.$[prod].prodQuantity`]: update.prodQuantity
      }
    }, {
      new: true,
      arrayFilters: [
        {
          'prod.prodName': update.prodName
        }
      ]
    }).then((documents) => {
      resolve(documents);
    }).catch((err) => {
      logger.info('Update product in input buffer is not success');
      reject(err);
    });
  });
};

const deleteProductFromOutputBuffer = ({
  assemblyLineName, steps,
  prodName
}) => {
  return new Promise((resolve, reject) => {
    const filter = { name: assemblyLineName };
    AssemblyLine.findOneAndUpdate(filter, {
      $pull: {
        [`steps.${steps - 1}.outputBuffer`]: { prodName: prodName }
      }
    }, {
      new: true
    }).then((documents) => {
      logger.info('Product has been deleted from output buffer');
      resolve(documents);
    }).catch((err) => {
      logger.error('Deleting product from output buffer is not success');
      reject(err);
    });
  });
};

module.exports = {
  createAssemblyLine: createAssemblyLine,
  readAssemblyLines: readAssemblyLines,
  readAssemblyLineByName: readAssemblyLineByName,
  deleteAssemblyLineByName: deleteAssemblyLineByName,
  addToInputBuffer: addToInputBuffer,
  updateProductInInputBuffer: updateProductInInputBuffer,
  deleteProductFromInputBuffer: deleteProductFromInputBuffer,
  addToOutputBuffer: addToOutputBuffer,
  updateProductInOutputBuffer: updateProductInOutputBuffer,
  deleteProductFromOutputBuffer: deleteProductFromOutputBuffer
};
