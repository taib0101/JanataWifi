import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Chart } from "chart.js/auto";

export const SubApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedTradeCode, setSelectedTradeCode] = useState("A");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://taib0110.pythonanywhere.com/");
      //   responseData = JSON.parse(responseData);
      console.log("Brooo : ", response.data.data);

      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data : ", error.message);
    }
  };

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing row
      const updatedData = data.map((row) =>
        row.id === formData.id ? formData : row
      );
      setData(updatedData);
    } else {
      // Add new row
      setData([...data, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setFormData({});
  };

  // Handle update button click
  const handleUpdate = (row) => {
    setFormData(row);
    setShowForm(true);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  // Render the table
  const renderTable = () => (
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
          {data.map((row) => (
            <tr key={row.objectID}>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {`${row.date}`}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {`${row.trade_code}`}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {`${row.high}`}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {`${row.low}`}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {`${row.open}`}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {`${row.close}`}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {`${row.volume}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleUpdate(row)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
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
        onClick={() => setShowForm(true)}
        className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Add Row
      </button>
    </div>
  );

  // Render the form
  const renderForm = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {formData.id ? "Update Row" : "Add Row"}
        </h2>
        <form onSubmit={handleFormSubmit}>
        {[...Array(7)].map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Column ${i + 1}`}
              value={formData[`column${i + 1}`] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [`column${i + 1}`]: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
          ))}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            {formData.id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-full p-2 mt-2 bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );

  // Render the chart
  const renderChart = () => {
    const chartData = {
      labels: data.map((row) => row.date).sort(),
      datasets: [
        {
          type: "line",
          label: "Close Price",
          data: data.map((row) => row.close),
          borderColor: "rgba(75, 192, 192, 1)",
          yAxisID: "y",
        },
        {
          type: "bar",
          label: "Volume",
          data: data.map((row) => row.volume),
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          yAxisID: "y1",
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
        },
      },
    };

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Trade Data Visualization</h2>
          <select
            value={selectedTradeCode}
            onChange={(e) => setSelectedTradeCode(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="A">Trade Code A</option>
            <option value="B">Trade Code B</option>
          </select>
        </div>
        <canvas id="multiAxisChart"></canvas>
      </div>
    );
  };

  return (
    <div className="p-5">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* {renderChart()} */}
          {renderTable()}
          {showForm && renderForm()}
        </>
      )}
    </div>
  );
};
