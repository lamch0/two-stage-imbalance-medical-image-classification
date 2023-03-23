import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function PieChart({ chartData, options }) {
  return <Doughnut data={chartData} options={options} />;
}
