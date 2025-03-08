import { useState, useEffect, createContext } from "react";
import { RenderTable } from "./Component/RenderTable";
import axios from "axios";

export const SubAppContext = createContext();

export const SubApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedTradeCode, setSelectedTradeCode] = useState("A");

  const Bro = [
    {
      objectID: "23d91834-fbec-11ef-ac2a-0affd551b62d",
      date: "2020-08-10",
      trade_code: "1JANATAMF",
      high: "4.3",
      low: "4.1",
      open: "4.2",
      close: "4.1",
      volume: "2,285,416",
    },
    {
      objectID: "23d91834-fbec-11ef-ac2a-0affd551b62d",
      date: "2020-08-10",
      trade_code: "1JANATAMF",
      high: "4.3",
      low: "4.1",
      open: "4.2",
      close: "4.1",
      volume: "2,285,416",
    },
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get("https://taib0110.pythonanywhere.com/");
      console.log("Brooo : ", response.data.data);

      // setData(response.data.data);
      setData(Bro);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data : ", error.message);
    }
  };

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const SubAppContextObject = {
    responseData: {
      data,
      setData,
    },
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
