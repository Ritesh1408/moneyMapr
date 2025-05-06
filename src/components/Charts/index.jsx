import React from "react";
import { Line, Pie } from "@ant-design/plots";

const Chartcomponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });

  const config = {
    data,
    width: 500,
    autoFit: false,
    xField: "date",
    yField: "amount",
    seriesField: "type",
    smooth: true,
    xAxis: {
      type: "time",
      tickCount: 5,
      range: [0, 1],
      mask: "YYYY-MM-DD",
    },
    yAxis: {
      title: {
        text: "Amount",
        style: {
          fontSize: 12,
          fontWeight: 500,
        },
      },
      label: {
        formatter: (v) => `${v}`,
      },
    },
  };

  const spendingData = sortedTransactions.filter((item) => {
    if (item.type == "expense") {
      return { tag: item.tag, amount: item.amount };
    }
  });

  const spendingconfig = {
    data: Object.values(spendingData),
    angleField: "amount",
    colorField: "tag",
    width: 500,
    radius: 1,
    label: {
      offset: "-50%",
      content: ({ data }) => `${data?.amount ?? ''}`,
      style: {
        fontSize: 12,
        fontWeight: 500,
      },
    },
    interactions: [{ type: "element-active" }],
    statistic: {
      title: {
        formatter: () => "Total",
        style: {
          fontSize: 24,
          lineHeight: 1,
          fontWeight: 500,
          
        },
      },
      content: {
        formatter: () =>
          `${sortedTransactions.reduce((acc, item) => acc + item.amount, 0)}`,
        style: {
          fontSize: 24,
          lineHeight: 1,
          fontWeight: 500,
        },
      },
    },
  };
  
  
  let chart;
  let pieChart;
  return (
    <div className="wrapper-charts">
      <div className="chart-container" style={{ alignItems: "center", paddingLeft: "20px", textAlign: "center" }}>
        <h2>Your Analytics</h2>
        {data && data.length > 0 ? (
          <Line {...config} onReady={(charInstance) => (chart = charInstance)} />
        ) : (
          <p>No transactions available to display analytics.</p>
        )}
      </div>

      <div className="chart-container" style={{ paddingLeft: "20px", textAlign: "center", alignItems: "center" }}>
        <h2>Your Spendings</h2>
        {spendingData && Object.keys(spendingData).length > 0 ? (
          <Pie {...spendingconfig} onReady={(pieInstance) => (pieChart = pieInstance)} />
        ) : (
          <p>No spending data available to display.</p>
        )}
      </div>

    </div>
  );
};

export default Chartcomponent;
