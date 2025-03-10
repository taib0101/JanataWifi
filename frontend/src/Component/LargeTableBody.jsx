import axios from "axios";
import { useCallback, useContext } from "react";
import { SubAppContext } from "../SubApp.jsx";
import { RenderTableContext } from "./RenderTable.jsx";
import { AutoSizer, List } from "react-virtualized";

export const LargeTableBody = () => {
  const SubAppContextValue = useContext(SubAppContext);
  const { data } = SubAppContextValue.responseData;
  const { setLoading, readData } = SubAppContextValue;
  const RenderTableContextValue = useContext(RenderTableContext);
  const { setShowForm } = RenderTableContextValue.formInformation;

  const rowRender = useCallback(
    ({ index, key, style }) => {
      const item = data[index];

      const deleteData = async (objectID) => {
        setLoading(true);

        console.log(objectID);
        try {
          await axios.delete("https://taib0110.pythonanywhere.com/delete", {
            headers: {
              objectID: objectID,
            },
          });
          await readData();
          await setLoading(false);
        } catch (error) {
          window.alert(error.message);
        }
      };

      return (
        <div
          key={key}
          style={style}
          className="flex flex-col lg:flex-row items-center justify-center lg:justify-start bg-white divide-y divide-gray-200"
        >
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 text-center lg:text-left">
            <span className="font-medium lg:hidden">Date: </span>
            {`${item.date}`}
          </div>
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 text-center lg:text-left">
            <span className="font-medium lg:hidden">Trade Code: </span>
            {`${item.trade_code}`}
          </div>
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 text-center lg:text-left">
            <span className="font-medium lg:hidden">High: </span>
            {`${item.high}`}
          </div>
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 text-center lg:text-left">
            <span className="font-medium lg:hidden">Low: </span>
            {`${item.low}`}
          </div>
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 text-center lg:text-left">
            <span className="font-medium lg:hidden">Open: </span>
            {`${item.open}`}
          </div>
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 text-center lg:text-left">
            <span className="font-medium lg:hidden">Close: </span>
            {`${item.close}`}
          </div>
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 text-center lg:text-left">
            <span className="font-medium lg:hidden">Volume: </span>
            {`${item.volume}`}
          </div>
          <div className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium flex-1 text-center lg:text-left">
            <button
              onClick={() =>
                setShowForm({
                  check: true,
                  type: "update",
                  initialFormData: item,
                })
              }
              className="text-indigo-600 hover:text-indigo-900"
            >
              Update
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                deleteData(item.objectID);
              }}
              className="ml-2 text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      );
    },
    [data, setShowForm]
  );

  // Calculate row height dynamically based on screen size
  const calculateRowHeight = () => {
    const isSmallScreen = window.innerWidth < 1024;
    return isSmallScreen ? 400 : 50; // Adjust these values as needed
  };

  return (
    <div className="w-full h-[82dvh]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={data.length}
            rowHeight={calculateRowHeight()} // Use dynamic row height
            rowRenderer={rowRender}
          />
        )}
      </AutoSizer>
    </div>
  );
};
