import React, { useEffect, useRef } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";

const MainChart = ({ data = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleColorSchemeChange = () => {
      if (chartRef.current) {
        setTimeout(() => {
          const chart = chartRef.current;
          chart.options.scales.x.grid.color = getStyle("--cui-border-color-translucent");
          chart.options.scales.y.grid.color = getStyle("--cui-border-color-translucent");
          chart.update();
        });
      }
    };

    document.documentElement.addEventListener("ColorSchemeChange", handleColorSchemeChange);
    return () =>
      document.documentElement.removeEventListener(
        "ColorSchemeChange",
        handleColorSchemeChange
      );
  }, []);

  // 🔥 transform API data
  const sorted = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const labels = sorted.map((item) =>
    new Date(item.date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
    })
  );

  // growth index (0,1,2...) = progression
  const values = sorted.map((_, index) => index + 1);

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: "300px", marginTop: "20px" }}
      data={{
        labels,
        datasets: [
          {
            label: "Career Growth",
            backgroundColor: `rgba(${getStyle("--cui-info-rgb")}, .1)`,
            borderColor: getStyle("--cui-info"),
            pointBackgroundColor: getStyle("--cui-info"),
            borderWidth: 3,
            data: values,
            fill: true,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                const item = sorted[context.dataIndex];
                return `${item.title} (${item.organization})`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: { color: getStyle("--cui-body-color") },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: getStyle("--cui-body-color"),
            },
          },
        },
        elements: {
          line: { tension: 0.4 },
          point: {
            radius: 4,
            hoverRadius: 6,
          },
        },
      }}
    />
  );
};

export default MainChart;