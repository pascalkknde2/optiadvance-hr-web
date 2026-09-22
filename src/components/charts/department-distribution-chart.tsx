"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { departmentDistribution } from "@/mocks/dashboard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const COLORS = ["#6366f1", "#00b8db", "#f0b100", "#00a63e", "#7f22fe", "#fb64b6", "#94a3b8"];

const DepartmentDistributionChart = () => {
  const total = departmentDistribution.reduce((sum, dept) => sum + dept.employees, 0);

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    labels: departmentDistribution.map((dept) => dept.department),
    colors: COLORS,
    dataLabels: { enabled: false },
    legend: {
      position: "bottom",
      fontSize: "13px",
      itemMargin: { horizontal: 8, vertical: 4 },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `${total}`,
            },
          },
        },
      },
    },
    tooltip: {
      y: { formatter: (value: number) => `${value} employees` },
    },
  };

  const chartSeries = departmentDistribution.map((dept) => dept.employees);

  return (
    <Chart options={chartOptions} series={chartSeries} type="donut" height={320} />
  );
};

export default DepartmentDistributionChart;
