import React from 'react';
import store from '../../store/AssemblyLineStore';
import {Table} from "react-bootstrap";

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
                <h3>Assembly Lines</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of steps</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        this.state.qeAssemblyLines.map(line => {
                                return (
                                    <React.Fragment key={line._id}>
                                                <tr>
                                                    <td>{line.name}</td>
                                                    <td className="text-center">{line.steps.length}</td>
                                                </tr>
                                    </React.Fragment>
                                    );
                        })
                    }
                    </tbody>
                </Table>
                <h3>Input Buffers</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Step</th>
                        <th>Product name</th>
                        <th>Product quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        this.state.qeAssemblyLines.map(line => {
                            return line.steps.map((step, index) => {
                                return (
                                    <React.Fragment key={line._id + '' +index}>
                                        {step.inputBuffer.map(inp => {
                                            return (
                                                <tr key={step._id +''+ index}>
                                                    <td>{line.name}</td>
                                                    <td className="text-center">{index+1}</td>
                                                    <td>{inp.prodName}</td>
                                                    <td className="text-center">{inp.prodQuantity}</td>
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            });
                        })
                    }
                    </tbody>
                </Table>
                <h3>Output Buffers</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Step</th>
                        <th>Product name</th>
                        <th>Product quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        this.state.qeAssemblyLines.map(line => {
                            return line.steps.map((step, index) => {
                                return (
                                    <React.Fragment key={line._id +''+ index}>
                                        {step.outputBuffer.map(out => {
                                            return (
                                                <tr key={step._id +''+ index}>
                                                    <td>{line.name}</td>
                                                    <td className="text-center">{index+1}</td>
                                                    <td>{out.prodName}</td>
                                                    <td className="text-center">{out.prodQuantity}</td>
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            });
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );


    }
}

export default AssemblyLinesList;
