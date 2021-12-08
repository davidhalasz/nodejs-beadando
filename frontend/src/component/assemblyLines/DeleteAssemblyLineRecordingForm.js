import React from "react";
import * as actions from '../../action/AssemblyLines';
class DeleteAssemblyLineRecordingForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
        });
    }

    render() {
        return(
            <div className={"mt-2 p-4 border border-danger"}>
                <h3>Delete Assembly Line</h3>
                    <label htmlFor={"name"} >Assembly Line name</label>
                    <input type={"text"} id={"name"} name={"name"}
                           value={this.state.name} onChange={this.formOnChange}/>
                    <br/>
                    <button className={"btn btn-danger"} onClick={()=> {
                        actions.deleteAssemblyLine(this.state);
                        this.resetForm();
                    }}>Delete</button>
            </div>
        );
    }
}

export default DeleteAssemblyLineRecordingForm;
