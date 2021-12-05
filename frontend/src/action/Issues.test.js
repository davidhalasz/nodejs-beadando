import {describe, it} from "@jest/globals";

jest.dontMock('./AssemblyLines');
import  * as actions from './AssemblyLines';
import  * as actionsConstants from '../dispatcher/IssueActionConstants';
jest.mock('axios');
import axios from 'axios';
jest.mock('../dispatcher/Dispatcher');
import dispatcher from "../dispatcher/Dispatcher";

describe('Testing AssemblyLines Actions', () => {

    const assemblyLines = [
        {
            "_id": "600d4a9e2e0f9e001bd9b796",
            "name": "ALINE-TEST1",
            "stepsOfNumber": 1
        },
        {
            "_id": "600d4b0b2e0f9e001bd9b797",
            "title": "ALINE_TEST2",
            "stepsOfNumber": 1
        }
    ];

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('fetches assemblyLines and dispatch them', async () => {
        // given
        axios.get.mockReturnValue( Promise.resolve({data: assemblyLines}));
        const expectedDispatchedEvent = {
            action: actionsConstants.refreshTasks,
            payload: assemblyLines
        };
        // when
        await actions.fetchAllTasks();
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('gets error during fetching assemblyLines', async () => {
        // given
        axios.get.mockReturnValue(Promise.reject());
        // when
        await actions.fetchAllTasks();
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(0);
    });

    it('creates a new issue successfully', async () => {
        // given
        axios.post.mockReturnValue(Promise.resolve());
        // when
        await actions.recordAssemblyLines(assemblyLines[0]);
        // then
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
    });

    it('creates a new issue unsuccessfully', async () => {
        // given
        axios.post.mockReturnValue(Promise.reject(new Error()));
        // when
        await actions.recordAssemblyLines(assemblyLines[0]);
        // then
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});
