import React from 'react';
import './App.scss';
import AssemblyLineRecordingForm from "./component/assemblyLines/AssemblyLineRecordingForm";
import AssemblyLinesList from "./component/assemblyLines/AssemblyLinesList";
import * as actions from './action/AssemblyLines';
import ProductRecordingForm from "./component/assemblyLines/ProductRecordingForm";
import DeleteAssemblyLineRecordingForm from "./component/assemblyLines/DeleteAssemblyLineRecordingForm";
import UpdateProductForm from "./component/assemblyLines/UpdateProductForm";

function App() {
  return (
    <div className={["App","container"]}>
        <div className={"row mx-4"}>
            <div className={"col-md-4"}>
                <div className={"col-md-12"}>
                    <AssemblyLineRecordingForm/>
                </div>
                <div className={"col-md-12"}>
                    <DeleteAssemblyLineRecordingForm/>
                </div>
            </div>
            <div className={"col-md-4"}>
                <ProductRecordingForm/>
            </div>
            <div className={"col-md-4"}>
                <UpdateProductForm/>
            </div>
        </div>
        <div className={"row mx-4"}>
            <div className={"my-5 col-md-3"}/>
            <div className={"my-5 col-md-6"}>
                <button className={"my-3 btn btn-info"} onClick={()=>actions.fetchAllAssemblyLines()}>Show All Assembly Lines</button>
                <AssemblyLinesList/>
            </div>
            <div className={"my-5 col-md-3"}/>
        </div>
    </div>
  );
}

export default App;
