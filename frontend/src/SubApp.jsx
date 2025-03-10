import { useState, useEffect, createContext } from "react";
import { RenderTable } from "./Component/RenderTable";
import axios from "axios";

export const SubAppContext = createContext();

export const SubApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedTradeCode, setSelectedTradeCode] = useState("A");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://taib0110.pythonanywhere.com/");
      const sortedDatesDescending = response.data.data.slice().sort((a, b) => b.date.localeCompare(a.date));
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
    setLoading
  };
  return (
    <SubAppContext.Provider value={SubAppContextObject}>
      <div className="p-5">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* {renderChart()} */}
            {<RenderTable />}
          </>
        )}
      </div>
    </SubAppContext.Provider>
  );
};
