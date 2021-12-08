import React from "react";
import * as actions from '../../action/AssemblyLines';


class ProductRecordingForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            assemblyLineName: '',
            stepNumber: 1,
            prodName: '',
            prodQuantity: 0,
            buffer: 'input'
        };
        this.formOnChange = this.formOnChange.bind(this);
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    resetForm() {
        this.setState({
            assemblyLineName: '',
            stepNumber: 1,
            prodName: '',
            prodQuantity: 0,
            buffer: 'input'
        });
    }

    render() {
        return(
            <div className={"mt-2 p-4 border border-dark"}>
                <h3>Add Product</h3>

                    <label htmlFor={"assemblyLineName"} >Assembly Line name</label>
                    <input type={"text"} id={"assemblyLineName"} name={"assemblyLineName"}
                           value={this.state.assemblyLineName} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"stepNumber"}>Step Number in Assembly Line</label>
                    <input type={"number"} min={1} id={"stepNumber"} name={"stepNumber"}
                           value={this.state.stepNumber} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"prodName"} >Product Name</label>
                    <input type={"text"} id={"prodName"} name={"prodName"}
                           value={this.state.prodName} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"prodQuantity"}>Product Quantity</label>
                    <input type={"number"} min={0} id={"prodQuantity"} name={"prodQuantity"}
                           value={this.state.prodQuantity} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"buffer"} >Select a Buffer</label>
                    <select id={"buffer"} name={"buffer"}
                            value={this.state.buffer} onChange={this.formOnChange}>
                        <option value={"input"}>Input Buffer</option>
                        <option value={"output"}>Output Buffer</option>
                    </select>
                    <br/>
                    <br/>
                    <button className={"btn btn-primary"} onClick={() => {
                        actions.recordProduct(this.state, this.state.buffer);
                        this.resetForm();
                    }}>Submit</button>

            </div>
        );
    }
}

export default ProductRecordingForm;
