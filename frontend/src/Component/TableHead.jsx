export const TableHead = () => {
  const heads = [
    "Date",
    "Trade Code",
    "High",
    "Low",
    "Open",
    "Close",
    "Volume",
    "Actions",
  ];
  return (
    <div className="min-w-full divide-y divide-gray-200">
      <div className="bg-gray-50 hidden lg:flex">
        {heads.map((items, index) => (
          <div
            key={index}
            className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex-1"
          >
            {`${items}`}
          </div>
        ))}
      </div>
    </div>
  );
};
