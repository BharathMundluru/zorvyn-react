import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";

function Insights() {

  const { transactions } = useContext(AppContext);

  const expenses = transactions.filter(t => t.type === "expense");

  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCategories[0];

  const monthlyMap = {};
  expenses.forEach(t => {
    const month = t.date.slice(0, 7);
    monthlyMap[month] = (monthlyMap[month] || 0) + t.amount;
  });

  const sortedMonths = Object.entries(monthlyMap).sort((a, b) => b[1] - a[1]);
  const highestMonth = sortedMonths[0];

  const months = Object.keys(monthlyMap).sort();
  let percentChange = 0;

  if (months.length >= 2) {
    const last = monthlyMap[months[months.length - 1]];
    const prev = monthlyMap[months[months.length - 2]];

    percentChange = prev !== 0 ? ((last - prev) / prev) * 100 : 0;
  }

  return (
    <div className="section insights">

      <h3>Insights</h3>

      <div className="insight-cards">

        <div className="insight-box">
          <p>Top Expense Category</p>
          <h2>{topCategory ? topCategory[0] : "N/A"}</h2>
        </div>

        <div className="insight-box">
          <p>Amount Spent on Category</p>
          <h2>₹{topCategory ? topCategory[1] : 0}</h2>
        </div>

        <div className="insight-box">
          <p>Highest Spending Month</p>
          <h2>
            {highestMonth
              ? `${new Date(highestMonth[0] + "-01").toLocaleString("default", {
                  month: "long",
                  year: "numeric"
                })} (₹${highestMonth[1]})`
              : "N/A"}
          </h2>
        </div>

        <div className="insight-box">
          <p>Monthly Change</p>
          <h2 style={{ color: percentChange >= 0 ? "#dc2626" : "#16a34a" }}>
            {percentChange >= 0 ? "▲" : "▼"} {percentChange.toFixed(1)}%
          </h2>
        </div>

      </div>

    </div>
  );
}

export default Insights;