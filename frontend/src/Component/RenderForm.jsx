import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { RenderTableContext } from "./RenderTable.jsx";

// Render the form
export const RenderForm = () => {
  const RenderTableContextValue = useContext(RenderTableContext);
  const { showForm, setShowForm } = RenderTableContextValue.formInformation;

  const [formData, setFormData] = useState({
    trade_code: "",
    high: "",
    low: "",
    open: "",
    close: "",
    volume: "",
  });
  useEffect(() => {
    if (showForm.type === "update") {
      setFormData({
        ...formData,
        trade_code: showForm.initialFormData.trade_code,
        high: showForm.initialFormData.high,
        low: showForm.initialFormData.low,
        open: showForm.initialFormData.open,
        close: showForm.initialFormData.close,
        volume: showForm.initialFormData.volume,
      });
    }
  }, [showForm.initialFormData]);

  // console.log("showForm : ", formData);
  // console.log("RenderTableContextValue : ", RenderTableContextValue);

  // const createData = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://taib0110.pythonanywhere.com/create",
  //       formData
  //     );
  //     console.log("Created Data Successfully : ", response);
  //   } catch (error) {
  //     // window.alert(error.message + "\n" + error.response);
  //     console.log(error);
  //   }
  // };

  const handleFormSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      console.log("Form Data : ", formData);

      let Datee = new Date(Date.now()).toLocaleDateString().split("/");
      if (Datee[0].length === 1) Datee[0] = "0" + Datee[0];
      if (Datee[1].length === 1) Datee[1] = "0" + Datee[1];
      Datee = Datee[2] + "-" + Datee[0] + "-" + Datee[1];
      setFormData({ ...formData, date: Datee });
      console.log(Datee);

      if (showForm.type === "create") {
        try {
          const response = await axios.post(
            "https://taib0110.pythonanywhere.com/create",
            formData
          );
          console.log("Created Data Successfully : ", response);
        } catch (error) {
          // window.alert(error.message + "\n" + error.response);
          console.log(error);
        }
      } else updateData();
    },
    [formData]
  );

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {showForm.type === "create" ? "Add Row" : "Update Row"}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <label>Trade Code</label>
            <input
              type="text"
              placeholder={"Trade Code"}
              name="trade_code"
              value={formData["trade_code"]}
              onChange={(e) =>
                setFormData({ ...formData, ["trade_code"]: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />

            <label>High</label>
            <input
              type="text"
              placeholder={"High"}
              name="high"
              value={formData["high"]}
              onChange={(e) =>
                setFormData({ ...formData, ["high"]: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />

            <label>Low</label>
            <input
              type="text"
              placeholder={"Low"}
              name="low"
              value={formData["low"]}
              onChange={(e) =>
                setFormData({ ...formData, ["low"]: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />

            <label>Open</label>
            <input
              type="text"
              placeholder={"Open"}
              name="open"
              value={formData["open"]}
              onChange={(e) =>
                setFormData({ ...formData, ["open"]: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />

            <label>Close</label>
            <input
              type="text"
              placeholder={"Close"}
              name="close"
              value={formData["close"]}
              onChange={(e) =>
                setFormData({ ...formData, ["close"]: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />

            <label>Volume</label>
            <input
              type="text"
              placeholder={"Volume"}
              name="volume"
              value={formData["volume"]}
              onChange={(e) =>
                setFormData({ ...formData, ["volume"]: e.target.value })
              }
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
              onClick={() =>
                setShowForm({ ...showForm, check: false, initialFormData: {} })
              }
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
