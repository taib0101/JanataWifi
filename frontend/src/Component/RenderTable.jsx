import { useState, useContext, useCallback, createContext } from "react";
import { RenderForm } from "./RenderForm.jsx";
import { VirtualizedLargeList } from "./VirtualizedLargeList.jsx";

export const RenderTableContext = createContext();

// Render the table
export const RenderTable = () => {

  const [showForm, setShowForm] = useState({
    check: false,
    type: "",
  });

  // // Handle Delete
  // const handleDelete = (id) => {
  //   // const updatedData = data.filter((dataValue) => dataValue.id !== id);
  //   // setData(updatedData);
  // };

  // console.log("SubAPPContextValue : ", data);
  // console.log("showForm : ", showForm.check);

  const RenderTableObject = {
    formInformation: {
      showForm,
      setShowForm
    }
  } 
  return (
    <>
      <RenderTableContext.Provider value={ RenderTableObject }>
        {showForm.check ? (
          <RenderForm />
        ) : (
            <VirtualizedLargeList />
          // <div className="overflow-x-auto bg-white rounded-lg shadow">
            
          // </div>
        )}
      </RenderTableContext.Provider>
    </>
  );
};
