import React from "react";
import * as actions from '../../action/AssemblyLines';


class UpdateProductForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            uAssemblyLineName: '',
            uStepNumber: 1,
            uProdName: '',
            uProdQuantity: 0,
            uBuffer: 'input'
        };
        this.formOnChange = this.formOnChange.bind(this);
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    resetForm() {
        this.setState({
            uAssemblyLineName: '',
            uStepNumber: 1,
            uProdName: '',
            uProdQuantity: 0,
            uBuffer: 'input'
        });
    }

    render() {
        return(
            <div className={"mt-2 p-4 border border-dark"}>
                    <h3>Update Product</h3>
                    <label htmlFor={"uAssemblyLineName"} >Assembly Line name</label>
                    <input type={"text"} id={"uAssemblyLineName"} name={"uAssemblyLineName"}
                           value={this.state.uAssemblyLineName} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"uStepNumber"}>Step Number in Assembly Line</label>
                    <input type={"number"} min={1} id={"uStepNumber"} name={"uStepNumber"}
                           value={this.state.uStepNumber} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"uProdName"} >Product Name</label>
                    <input type={"text"} id={"uProdName"} name={"uProdName"}
                           value={this.state.uProdName} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"uProdQuantity"}>Product Quantity</label>
                    <input type={"number"} min={0} id={"uProdQuantity"} name={"uProdQuantity"}
                           value={this.state.uProdQuantity} onChange={this.formOnChange}/>
                    <br/>
                    <label htmlFor={"uBuffer"} >Select a Buffer</label>
                    <select id={"uBuffer"} name={"uBuffer"}
                            value={this.state.uBuffer} onChange={this.formOnChange}>
                        <option value={"input"}>Input Buffer</option>
                        <option value={"output"}>Output Buffer</option>
                    </select>
                    <br/>
                    <br/>
                    <div className="btn-toolbar">
                        <button className={"btn btn-primary mr-auto"}
                                onClick={() => {
                                    actions.updateProduct(this.state, this.state.uBuffer);
                                    this.resetForm();
                                }}>
                            Update Product
                        </button>
                        <button className={"btn btn-danger"}
                                onClick={() => {
                                    actions.deleteProduct(
                                        this.state.uAssemblyLineName, this.state.uStepNumber,
                                        this.state.uProdName, this.state.uBuffer);
                                    this.resetForm();
                                }}>
                            Delete Product
                        </button>
                    </div>
            </div>
        );
    }
}

export default UpdateProductForm;
