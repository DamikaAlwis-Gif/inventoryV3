import React from "react";
import { useState, useEffect } from "react";

const TableMaintenance = (props) => {
  const { details,onClickMore } = props;

  const [isChecked, setIsChecked] = useState(true);

  const handleRadioChange = () => {
    // Toggle the value of isChecked when the radio button changes
    setIsChecked(!isChecked);
  };
  
  return (
<>
    <div>
      <label style={{color: "black"}}>
        <input
          type="radio"
          value="true"
          checked={isChecked === true}
          onChange={handleRadioChange}
        />
        &nbsp; Incomplete &nbsp; &nbsp;
      </label>
      <label style={{color: "black"}}>
        <input
          type="radio"
          value="false"
          checked={isChecked === false}
          onChange={handleRadioChange}
        />
        &nbsp; Complete
      </label>
     <br/>
     <br/>
    </div>


<div>
    {isChecked ? (
    <div> 
      <table className="table table-primary table-hover table-responsive  ">
        <thead className=" ">
          <tr>
            <th>Type</th>
            <th>Starting</th>
            <th>Ending</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {details.filter((mt) => mt.status == "Undone").map((mt) => (
            <tr key={mt.maintenance_id} 
            onClick={(e) => onClickMore(e, mt.maintenance_id)}
            >
              <td>{mt.maintenance_type}</td>
              <td>{mt.start_date}</td>
              <td>{mt.completion_date}</td>
              <td>{mt.status === "Undone" ? "Incomplete" : "Complete"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{color: "black"}}>Click on rows to change the maintenance status</p>
    </div>
    
    ):(
      <div>
      <table className="table table-primary table-hover table-responsive  ">
        <thead className=" ">
          <tr>
            <th>Type</th>
            <th>Starting</th>
            <th>Ending</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {details.filter((mt) => mt.status == "Done").map((mt) => (
            <tr key={mt.maintenance_id} >
              <td>{mt.maintenance_type}</td>
              <td>{mt.start_date}</td>
              <td>{mt.completion_date}</td>
              <td>{mt.status === "Undone" ? "Incomplete" : "Complete"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    )}
          </div>
    </>
  );
};

export default TableMaintenance;
