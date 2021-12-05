import axios from 'axios';
import dispatcher from '../dispatcher/Dispatcher';
import * as actionConstants from '../dispatcher/IssueActionConstants';
import * as notificationActions from '../dispatcher/NotificatonActionConstants';
import winston from "winston";


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

const _fetchAllAssemblyLines = () => {
   axios.get('/assembly_lines')
       .then(resp => {
           dispatcher.dispatch({
               action: actionConstants.refreshTasks,
               payload: resp.data
           });
       })
       .catch(err => {
           logger.error(err);
       });
};

const _recordAssemblyLine = ({name, numberOfSteps}) => {
    axios.post('/assembly_lines', {
        name: name,
        numberOfSteps: numberOfSteps})
        .then(() =>{
            dispatcher.dispatch({
                action: notificationActions.showSuccess,
                payload: `Assembly Line recorded`
            });
        })
        .catch(err => {
            dispatcher.dispatch({
                action: notificationActions.showFailure,
                payload: err
            });
        });
};

const _recordProduct = ({assemblyLineName, stepNumber, prodName, prodQuantity}, buffer) => {
    axios.post(`/assembly_lines/${buffer}/product`, {
        assemblyLineName: assemblyLineName,
        steps: stepNumber,
        prodName: prodName,
        prodQuantity: prodQuantity})
        .then(() =>{
            dispatcher.dispatch({
                action: notificationActions.showSuccess,
                payload: `Assembly Line recorded`
            });
        })
        .catch(err => {
            dispatcher.dispatch({
                action: notificationActions.showFailure,
                payload: err
            });
        });
};

export const fetchAllAssemblyLines = _fetchAllAssemblyLines;
export const recordAssemblyLine = _recordAssemblyLine;
export const recordProduct = _recordProduct;

