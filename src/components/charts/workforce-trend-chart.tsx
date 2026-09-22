"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { workforceTrend } from "@/mocks/dashboard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const WorkforceTrendChart = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    colors: ["#6366f1", "#00b8db"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: [3, 2],
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "13px",
    },
    grid: {
      borderColor: "#00000012",
      strokeDashArray: 4,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: workforceTrend.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: { text: "Headcount" },
        labels: { formatter: (value: number) => `${value}` },
      },
      {
        opposite: true,
        title: { text: "New hires" },
        labels: { formatter: (value: number) => `${value}` },
      },
    ],
    tooltip: {
      shared: true,
    },
  };

  const chartSeries = [
    { name: "Headcount", data: workforceTrend.headcount },
    { name: "New hires", data: workforceTrend.newHires },
  ];

  return (
    <Chart options={chartOptions} series={chartSeries} type="area" height={320} />
  );
};

export default WorkforceTrendChart;
