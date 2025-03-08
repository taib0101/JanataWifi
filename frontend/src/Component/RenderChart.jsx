// Render the chart
const RenderChart = () => {
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