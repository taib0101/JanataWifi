import { useContext } from "react";
import { RenderTableContext } from "./RenderTable.jsx";

// Render the form
export const RenderForm = () => {
  // const [formData, setFormData] = useState({
  //   date: "",
  //   trade_code: "",
  //   high: "",
  //   low: "",
  //   open: "",
  //   close: "",
  //   volume: "",
  // });

  const RenderTableContextValue = useContext(RenderTableContext);
  const { showForm, setShowForm } = RenderTableContextValue.formInformation;
  console.log("RenderTableContextValue : ", RenderTableContextValue);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {showForm.type === "create" ? "Add Row" : "Update Row"}
          </h2>
          <form
          // onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder={`Date`}
              // value={formData[`date`]}
              // onChange={(e) =>
              //   setFormData({ ...formData, [`date`]: e.target.value })
              // }
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              {showForm.type === "create" ? "Add" : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm({ ...showForm, check: false })}
              className="w-full p-2 mt-2 bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
