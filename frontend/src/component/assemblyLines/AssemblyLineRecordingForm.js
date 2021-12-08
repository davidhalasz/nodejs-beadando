import React from "react";
import * as actions from '../../action/AssemblyLines';
class AssemblyLineRecordingForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numberOfSteps: 1
        };
        this.formOnChange = this.formOnChange.bind(this);
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    resetForm() {
        this.setState({
            name: '',
            numberOfSteps: 1
        });
    }

    render() {
        return(
            <div className={"mt-2 p-4 border border-dark"}>
                <h3>Create New Assembly Line</h3>

                    <label htmlFor={"name"} >Assembly Line name</label>
                    <input type={"text"} id={"name"}
                           name={"name"} value={this.state.name}
                           onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"numberOfSteps"}>Number of steps</label>
                    <input type={"number"} min={1} id={"numberOfSteps"}
                           name={"numberOfSteps"} value={this.state.numberOfSteps}
                           onChange={this.formOnChange}/>
                    <br/>
                    <button className={"btn btn-primary"} onClick={()=> {
                        actions.recordAssemblyLine(this.state);
                        this.resetForm();
                    }}>Submit</button>

            </div>
        );
    }
}

export default AssemblyLineRecordingForm;
