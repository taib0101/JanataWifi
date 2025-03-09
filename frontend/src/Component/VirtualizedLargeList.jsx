import { useContext } from "react";
import { SubAppContext } from "../SubApp.jsx";
import { RenderTableContext } from "./RenderTable.jsx";
import { AutoSizer, List } from "react-virtualized";

const TableHead = () => {
  return (
    <div className="min-w-full divide-y divide-gray-200">
      <div className="bg-gray-50 hidden lg:flex">
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          Date
        </div>
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          Trade Code
        </div>
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          High
        </div>
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          Low
        </div>
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          Open
        </div>
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          Close
        </div>
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          Volume
        </div>
        <div className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1">
          Actions
        </div>
      </div>
    </div>
  );
};

const LargeTableBody = ({ data, setShowForm }) => {
  const rowRender = ({ index, key, style }) => {
    const item = data[index];
    console.log("item Broooo : ", item);

    return (
      <>
        <div key={key} style={style}  className="flex flex-col lg:flex-row items-center justify-center lg:justify-start bg-white divide-y divide-gray-200">
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
              onClick={() => setShowForm({ check: true, type: "update" })}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Update
            </button>
            <button
              // onClick={() => handleDelete(item.id)}
              className="ml-2 text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full h-[400px]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={data.length}
            rowHeight={50}
            rowRenderer={rowRender}
          />
        )}
      </AutoSizer>
      <style jsx>{`
        .row {
          border-bottom: 1px solid #eee;
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export const VirtualizedLargeList = () => {
  const SubAppContextValue = useContext(SubAppContext);
  const { data } = SubAppContextValue.responseData;
  const RenderTableContextValue = useContext(RenderTableContext);
  const { setShowForm } = RenderTableContextValue.formInformation;

  return (
    <>
      <div className="min-w-full divide-y divide-gray-200">
        <TableHead />
        <LargeTableBody data={data} setShowForm={setShowForm} />
      </div>

      <button
        onClick={() => setShowForm({ check: true, type: "create" })}
        className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Create
      </button>
    </>
  );
};
