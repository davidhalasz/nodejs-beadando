import React from 'react';
import store from '../../store/AssemblyLineStore';

class AssemblyLinesList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {qeAssemblyLines : []};
        this._updateStateFromStore = this._updateStateFromStore.bind(this);
    }

    componentDidMount() {
        store.addChangeListener(this._updateStateFromStore);
    }

    componentWillUnmount() {
        store.removeChangeListener(this._updateStateFromStore);
    }

    _updateStateFromStore(){
        this.setState({qeAssemblyLines: store._qeAssemblyLines});
    }

    render() {
        return(
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of steps</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.qeAssemblyLines.map(({_id, name, numberOfSteps}) => {
                            return (
                                <tr key={_id}>
                                    <td>{name}</td>
                                    <td>{numberOfSteps}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AssemblyLinesList;
