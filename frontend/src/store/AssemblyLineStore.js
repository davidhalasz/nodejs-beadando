import {EventEmitter} from 'events';
import dispatcher from "../dispatcher/Dispatcher";
import * as actions from '../dispatcher/IssueActionConstants';

class AssemblyLineStore extends EventEmitter{

    _qeAssemblyLines = [];

    emitChange(){
        this.emit('Change');
    }

    addChangeListener(callback){
        this.addListener('Change',callback);
    }

    removeChangeListener(callback){
        this.removeListener('Change',callback);
    }
}

const store = new AssemblyLineStore();
export default store;

dispatcher.register(({action,payload})=>{
    if(action !== actions.refreshTasks ) return;
    store._qeAssemblyLines = Array.isArray(payload) ? payload : Array.of(payload);
    store.emitChange();
});
