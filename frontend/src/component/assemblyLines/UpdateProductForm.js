import React from "react";
import * as actions from '../../action/AssemblyLines';


class UpdateProductForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            assemblyLineName: '',
            stepNumber: 1,
            prodName: '',
            prodQuantity: 0,
        };
        this.buffer = 'input';
        this.formOnChange = this.formOnChange.bind(this);
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    render() {
        return(
            <div className={"mt-2 p-4 border border-dark"}>
                <h3>Update Product</h3>
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
                        value={this.buffer} onChange={this.formOnChange}>
                    <option value={"input"}>Input Buffer</option>
                    <option value={"output"}>Output Buffer</option>
                </select>
                <br/>
                <br/>
                <button className={"btn btn-primary"} onClick={() => { actions.updateProduct(this.state, this.buffer); }}>Submit</button>
            </div>
        );
    }
}

export default UpdateProductForm;
