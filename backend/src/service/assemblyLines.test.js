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

  it('Test delete assembly line by name', () => {
    AssemblyLine.findOneAndDelete.mockImplementation(() => Promise.resolve(ASSEMBLY_LINE_CREATE));
    expect.assertions(1);
    service.deleteAssemblyLineByName(ASSEMBLY_LINE_CREATE.name);
    expect(AssemblyLine.findOneAndDelete).toHaveBeenCalled();
  });

  it('Test delete assembly line by name With error', () => {
    AssemblyLine.findOneAndDelete.mockImplementation(() => Promise.resolve(null));
    expect.assertions(1);
    service.deleteAssemblyLineByName(ASSEMBLY_LINE_CREATE.name)
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
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve(null));
    expect.assertions(1);
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
    AssemblyLine.findOneAndUpdate.mockImplementation(() => Promise.resolve(null));
    expect.assertions(1);
    service.addToOutputBuffer(ASSEMBLY_LINE_CREATE.name)
      .catch(err => expect(err).toEqual(new Error()));
    expect(AssemblyLine.findOneAndUpdate).toHaveBeenCalled();
  });

  /*
  it('find an assembly line by name', () => {
    AssemblyLine.find.mockImplementation(() => Promise.resolve(ASSEMBLY_LINE_WITH_PRODUCT));
    expect.assertions(1);
    service.readAssemblyLineByName(ASSEMBLY_LINE_WITH_PRODUCT.name);
    expect(AssemblyLine.findOne).toHaveBeenCalled();
  });
   */
/*

  it('find an issue by ID', () => {
    expect.assertions(2);
    assemblyLine.findById.mockImplementation(() => Promise.resolve(ASSEMBLY_LINE_CREATE));
    service.readIssuesById(OPEN_ISSUE_ID).then((issue) => {
      expect(issue).toEqual(ASSEMBLY_LINE_CREATE);
    });
    expect(assemblyLine.findById).toHaveBeenCalled();
  });

  it('find a not existing issue by ID', () => {
    expect.assertions(2);
    assemblyLine.findById.mockImplementation(() => Promise.reject(new Error()));
    service.readIssuesById(INVALID_ISSUE_ID).catch(err => {
      expect(err).toBeDefined();
    });
    expect(assemblyLine.findById).toHaveBeenCalled();
  });

  it('change an issue form open to in progress', async () => {
    // given
    assemblyLine.findById.mockImplementation(() => Promise.resolve(ASSEMBLY_LINE_CREATE));
    assemblyLine.findByIdAndUpdate.mockImplementation(() => Promise.resolve());
    // when
    await service.changeStateToInProgress(OPEN_ISSUE_ID);
    // then
    expect.assertions(5);
    expect(assemblyLine.findById).toHaveBeenCalled();
    expect(assemblyLine.findById.mock.calls[0][0]).toBe(OPEN_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate).toHaveBeenCalled();
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][0]).toBe(OPEN_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][1]).toEqual({ state: issueState.IN_PROGRESS });
  });

  it('change an issue form resolved to in progress', async () => {
    // given
    assemblyLine.findById.mockImplementation(() => Promise.resolve(RESOLVED_ISSUE));
    assemblyLine.findByIdAndUpdate.mockImplementation(() => Promise.resolve());
    // when
    await service.changeStateToInProgress(RESOLVED_ISSUE_ID);
    // then
    expect.assertions(5);
    expect(assemblyLine.findById).toHaveBeenCalled();
    expect(assemblyLine.findById.mock.calls[0][0]).toBe(RESOLVED_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate).toHaveBeenCalled();
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][0]).toBe(RESOLVED_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][1]).toEqual({ state: issueState.IN_PROGRESS });
  });

  it('change an issue from in progress to resolved', async () => {
    // given
    assemblyLine.findById.mockImplementation(() => Promise.resolve(IN_PROGRESS_ISSUE));
    assemblyLine.findByIdAndUpdate.mockImplementation((id, update, options) => Promise.resolve());
    // when
    await service.changeStateToResolved(IN_PROGRESS_ISSUE_ID);
    // then
    expect.assertions(5);
    expect(assemblyLine.findById).toHaveBeenCalled();
    expect(assemblyLine.findById.mock.calls[0][0]).toBe(IN_PROGRESS_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate).toHaveBeenCalled();
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][0]).toBe(IN_PROGRESS_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][1]).toEqual({ state: issueState.RESOLVED });
  });

  it('change an issue from resolved to closed', async () => {
    // given
    assemblyLine.findById.mockImplementation(() => Promise.resolve(RESOLVED_ISSUE));
    assemblyLine.findByIdAndUpdate.mockImplementation((id, update, options) => Promise.resolve());
    // when
    await service.changeStateToClosed(RESOLVED_ISSUE_ID);
    // then
    expect.assertions(5);
    expect(assemblyLine.findById).toHaveBeenCalled();
    expect(assemblyLine.findById.mock.calls[0][0]).toBe(RESOLVED_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate).toHaveBeenCalled();
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][0]).toBe(RESOLVED_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][1]).toEqual({ state: issueState.CLOSED });
  });

  describe('try to change to in progress from not open or resolved state', () => {
    each([
      [CLOSED_ISSUE_ID, CLOSED_ISSUE],
      [IN_PROGRESS_ISSUE_ID, IN_PROGRESS_ISSUE]
    ]).it('when the input is (%s)', async (issueId, issue) => {
      // given
      assemblyLine.findById.mockImplementation(() => Promise.resolve(issue));
      // when
      expect.assertions(3);
      try {
        await service.changeStateToInProgress(issueId);
      } catch (err) {
        // then
        expect(assemblyLine.findById).toHaveBeenCalled();
        expect(assemblyLine.findById.mock.calls[0][0]).toBe(issueId);
        expect(err).not.toBeNull();
      }
    });
  });

  describe('try to change to resolved from not in progress', () => {
    each([
      [OPEN_ISSUE_ID, ASSEMBLY_LINE_CREATE],
      [CLOSED_ISSUE_ID, CLOSED_ISSUE],
      [RESOLVED_ISSUE_ID, RESOLVED_ISSUE]
    ]).it('when the input is (%s)', async (issueId, issue) => {
      // given
      assemblyLine.findById.mockImplementation(() => Promise.resolve(issue));
      // when
      expect.assertions(3);
      try {
        await service.changeStateToResolved(issueId);
      } catch (err) {
        // then
        expect(assemblyLine.findById).toHaveBeenCalled();
        expect(assemblyLine.findById.mock.calls[0][0]).toBe(issueId);
        expect(err).not.toBeNull();
      }
    });
  });

  describe('try to change to close from not resolved state', () => {
    each([
      [OPEN_ISSUE_ID, ASSEMBLY_LINE_CREATE],
      [CLOSED_ISSUE_ID, CLOSED_ISSUE],
      [IN_PROGRESS_ISSUE_ID, IN_PROGRESS_ISSUE]
    ]).it('when the input is (%s)', async (issueId, issue) => {
      // given
      assemblyLine.findById.mockImplementation(() => Promise.resolve(issue));
      // when
      expect.assertions(3);
      try {
        await service.changeStateToClosed(issueId);
      } catch (err) {
        // then
        expect(assemblyLine.findById).toHaveBeenCalled();
        expect(assemblyLine.findById.mock.calls[0][0]).toBe(issueId);
        expect(err).not.toBeNull();
      }
    });
  });

  it('performs allowed state change with error during update', async () => {
    // given
    assemblyLine.findById.mockImplementation(() => Promise.resolve(RESOLVED_ISSUE));
    assemblyLine.findByIdAndUpdate.mockImplementation(() => Promise.reject(new Error()));
    // when
    expect.assertions(6);
    try {
      await service.changeStateToInProgress(RESOLVED_ISSUE_ID);
    } catch (err) {
      expect(err).not.toBeNull();
    }
    // then
    expect(assemblyLine.findById).toHaveBeenCalled();
    expect(assemblyLine.findById.mock.calls[0][0]).toBe(RESOLVED_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate).toHaveBeenCalled();
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][0]).toBe(RESOLVED_ISSUE_ID);
    expect(assemblyLine.findByIdAndUpdate.mock.calls[0][1]).toEqual({ state: issueState.IN_PROGRESS });
  });

  it('change state of not existing issue', async () => {
    // given
    assemblyLine.findById.mockImplementation(() => Promise.reject(new Error()));
    // when
    expect.assertions(1);
    try {
      await service.changeStateToClosed(INVALID_ISSUE_ID);
    } catch (err) {
      expect(err).not.toBeNull();
    }
  });
 */
});
