import { useState, useContext, useCallback, createContext } from "react";
import { RenderForm } from "./RenderForm.jsx";
import { SubAppContext } from "../SubApp.jsx";

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

  // Handle Buttons
  const handleButtons = (type) => {
    setShowForm({
      check: true,
      type,
    });
  };

  const SubAppContextValue = useContext(SubAppContext);
  const { data } = SubAppContextValue.responseData;
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
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    Trade_Code
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    High
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    Low
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    Open
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    Close
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    Volume
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((dataValue, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${dataValue.date}`}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${dataValue.trade_code}`}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${dataValue.high}`}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${dataValue.low}`}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${dataValue.open}`}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${dataValue.close}`}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${dataValue.volume}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setShowForm({ check: true, type: "update" })}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Update
                      </button>
                      <button
                        // onClick={() => handleDelete(dataValue.id)}
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setShowForm({ check: true, type: "create" })}
              className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              Create 
            </button>
          </div>
        )}
      </RenderTableContext.Provider>
    </>
  );
};
