import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { RenderTable } from "./Component/RenderTable.jsx";

export const SubAppContext = createContext();
export const SubApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const readUrl = "https://taib0110.pythonanywhere.com/";
  const createUrl = "https://taib0110.pythonanywhere.com/create";
  const updateUrl = "https://taib0110.pythonanywhere.com/update";
  const deleteUrl = "https://taib0110.pythonanywhere.com/delete";

  const fetchData = async () => {
    try {
      const response = await axios.get(readUrl);
      const sortedDatesDescending = response.data.data
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));
      setData(sortedDatesDescending);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data : ", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const SubAppContextObject = {
    responseData: {
      data,
      setData,
    },
    readData: fetchData,
    setLoading,
    Method: {
      createUrl,
      updateUrl,
      deleteUrl,
    },
  };

  return (
    <SubAppContext.Provider value={SubAppContextObject}>
      <div className="p-3">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <h2 className="lg:text-2xl text-gray-700 font-semibold">
                JanataWiFi Data Visualization
              </h2>
            </div>
            <RenderTable />
          </>
        )}
      </div>
    </SubAppContext.Provider>
  );
};
