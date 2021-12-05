import React from 'react';
import './App.scss';
import AssemblyLineRecordingForm from "./component/assemblyLines/AssemblyLineRecordingForm";
import AssemblyLinesList from "./component/assemblyLines/AssemblyLinesList";

function App() {
  return (
    <div className={["App","container"]}>
        <div className={"row"}>
            <div className={"col-md-3"}></div>
            <div className={"col-md-6"}>
                <AssemblyLineRecordingForm/>
                <AssemblyLinesList/>
            </div>
            <div className={"col-md-3"}></div>
        </div>
    </div>
  );
}

export default App;
