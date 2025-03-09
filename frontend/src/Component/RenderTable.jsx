import { useState, createContext } from "react";
import { RenderForm } from "./RenderForm.jsx";
import { LargeTableBody } from "./LargeTableBody.jsx";
import { TableHead } from "./TableHead.jsx";

export const RenderTableContext = createContext();

// Render the table
export const RenderTable = () => {
  const [showForm, setShowForm] = useState({
    check: false,
    type: "",
    initialFormData: {},
  });

  const RenderTableObject = {
    formInformation: {
      showForm,
      setShowForm,
    },
  };

  return (
    <>
      <RenderTableContext.Provider value={RenderTableObject}>
        {showForm.check ? (
          <RenderForm />
        ) : (
          <>
            <div className="min-w-full divide-y divide-gray-200">
              <TableHead />
              <LargeTableBody />
            </div>
            <button
              onClick={() =>
                setShowForm({ ...showForm, check: true, type: "create" })
              }
              className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              Create
            </button>
          </>
        )}
      </RenderTableContext.Provider>
    </>
  );
};
