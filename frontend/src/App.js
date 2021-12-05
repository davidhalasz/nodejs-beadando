import React from 'react';
import './App.scss';
import AssemblyLineRecordingForm from "./component/assemblyLines/AssemblyLineRecordingForm";
import AssemblyLinesList from "./component/assemblyLines/AssemblyLinesList";
import * as actions from './action/AssemblyLines';
import ProductRecordingForm from "./component/assemblyLines/ProductRecordingForm";

function App() {
  return (
    <div className={["App","container"]}>
        <div className={"row"}>
            <div className={"my-5 col-md-3"}></div>
            <div className={"my-5 col-md-6"}>
                <AssemblyLineRecordingForm/>
                <ProductRecordingForm/>
                <button className={"my-3 btn btn-info"} onClick={()=>actions.fetchAllAssemblyLines()}>Show All Assembly Lines</button>
                <AssemblyLinesList/>
            </div>
            <div className={"col-md-3"}></div>
        </div>
    </div>
  );
}

export default App;
