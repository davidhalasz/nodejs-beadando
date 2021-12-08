jest.mock('../model/assemblyLine');
const AssemblyLine = require('../model/assemblyLine');
const service = require('./assemblyLines');
const { Promise } = require('mongoose');

const ASSEMBLY_LINE_CREATE = {
  name: 'ALINE-0',
  numberOfSteps: 2
};

const PRODUCT = {
  prodName: 'cogs',
  prodQuantity: 5
};

const INPUT_BUFFER = {
  inputBuffer: PRODUCT,
  outputBuffer: []
};

const ASSEMBLY_LINE_WITH_PRODUCT = {
  name: ASSEMBLY_LINE_CREATE.name,
  steps: [
    INPUT_BUFFER
  ]
};

const EMPTY_STEP = {
  inputBuffer: [],
  outputBuffer: []
};

const EMPTY_ASSEMBLY_LINE = {
  name: ASSEMBLY_LINE_CREATE.name,
  steps: [
    EMPTY_STEP
  ]
};

const PRODUCT_REQUEST = {
  name: ASSEMBLY_LINE_CREATE.name,
  stepNumber: ASSEMBLY_LINE_CREATE.numberOfSteps,
  ...PRODUCT
};

describe('assemblyLine Service Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Test Create assemblyLine', () => {
    AssemblyLine.create.mockImplementation(() => Promise.resolve());
    expect.assertions(1);
    service.createAssemblyLine(ASSEMBLY_LINE_CREATE);
    expect(AssemblyLine.create).toHaveBeenCalled();
  });

  it('Test Create assemblyLine returns error', () => {
    AssemblyLine.create.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.createAssemblyLine(ASSEMBLY_LINE_CREATE).catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.create).toHaveBeenCalled();
  });

  it('Test read all assembly lines', () => {
    const assemblyLines = [ASSEMBLY_LINE_WITH_PRODUCT, ASSEMBLY_LINE_WITH_PRODUCT];
    AssemblyLine.find.mockImplementation(() => Promise.resolve(assemblyLines));
    expect.assertions(2);
    service.readAssemblyLines().then((docs) => expect(docs).toEqual(assemblyLines));
    expect(AssemblyLine.find).toHaveBeenCalled();
  });

  it('reads all Assembly lines with error', () => {
    AssemblyLine.find.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.readAssemblyLines().catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.find).toHaveBeenCalled();
  });

  it('Test read assemblyLine by name returns error', () => {
    AssemblyLine.find.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.readAssemblyLineByName(ASSEMBLY_LINE_CREATE).catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.find).toHaveBeenCalled();
  });

  it('Test delete assembly line by name', () => {
    AssemblyLine.findOneAndDelete.mockImplementation(() => Promise.resolve(ASSEMBLY_LINE_CREATE));
    expect.assertions(1);
    service.deleteAssemblyLineByName(ASSEMBLY_LINE_CREATE.name);
    expect(AssemblyLine.findOneAndDelete).toHaveBeenCalled();
  });

  it('Test delete assembly line by name With error', () => {
    AssemblyLine.findOneAndDelete.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.deleteAssemblyLineByName()
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndDelete).toHaveBeenCalled();
  });

  it('Test add product to input buffer', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve(EMPTY_ASSEMBLY_LINE));
    expect.assertions(1);
    service.addToInputBuffer(PRODUCT_REQUEST);
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test add product to input buffer With error', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.addToInputBuffer(ASSEMBLY_LINE_CREATE.name)
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test add product to output buffer', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve(EMPTY_ASSEMBLY_LINE));
    expect.assertions(1);
    service.addToOutputBuffer(PRODUCT_REQUEST);
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test add product to output buffer With error', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.addToOutputBuffer(ASSEMBLY_LINE_CREATE.name)
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test update product in input buffer', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve());
    expect.assertions(1);
    service.updateProductInInputBuffer(PRODUCT_REQUEST.name,
      PRODUCT_REQUEST.stepNumber, PRODUCT_REQUEST.prodName, PRODUCT_REQUEST.prodQuantity);
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test update product in input buffer returns error', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.updateProductInInputBuffer(ASSEMBLY_LINE_CREATE.name)
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test delete product from input buffer', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve());
    expect.assertions(1);
    service.deleteProductFromInputBuffer(PRODUCT_REQUEST.name,
      PRODUCT_REQUEST.stepNumber, PRODUCT_REQUEST.prodName);
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test delete product from input buffer returns error', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.deleteProductFromInputBuffer(ASSEMBLY_LINE_CREATE.name)
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test delete product from output buffer', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve());
    expect.assertions(1);
    service.deleteProductFromOutputBuffer(PRODUCT_REQUEST.name,
      PRODUCT_REQUEST.stepNumber, PRODUCT_REQUEST.prodName);
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test delete product from output buffer returns error', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.deleteProductFromOutputBuffer(ASSEMBLY_LINE_CREATE.name)
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test update product in output buffer', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve());
    expect.assertions(1);
    service.updateProductInOutputBuffer(PRODUCT_REQUEST.name,
      PRODUCT_REQUEST.stepNumber, PRODUCT_REQUEST.prodName, PRODUCT_REQUEST.prodQuantity);
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('Test update product in output buffer returns error', () => {
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(2);
    service.updateProductInOutputBuffer(ASSEMBLY_LINE_CREATE.name)
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  it('test fetch an assembly line by name', () => {
    AssemblyLine.find.mockImplementation(() => Promise.resolve(ASSEMBLY_LINE_WITH_PRODUCT));
    expect.assertions(1);
    service.readAssemblyLineByName(ASSEMBLY_LINE_WITH_PRODUCT.name);
    expect(AssemblyLine.find).toHaveBeenCalled();
  });
});
