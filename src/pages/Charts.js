import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, Label,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, LineChart, Line
} from "recharts";

function Charts({ transactions }) {

  const lineData = Object.values(
    transactions.reduce((acc, t) => {
      if (!acc[t.date]) {
        acc[t.date] = { date: t.date, income: 0, expense: 0 };
      }

      if (t.type === "income") acc[t.date].income += t.amount;
      else acc[t.date].expense += t.amount;

      return acc;
    }, {})
  );

  const monthlyData = Object.values(
    transactions.reduce((acc, t) => {
      const month = t.date.slice(0, 7);

      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }

      if (t.type === "income") acc[month].income += t.amount;
      else acc[month].expense += t.amount;

      return acc;
    }, {})
  );

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const profit = totalIncome - totalExpense;

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  const expenseData = Object.entries(
    transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  const revenueData = Object.entries(
    transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div>

      <div className="charts-row-1">

        <div className="chart-box">
          <h3>Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="income" stroke="#16a34a" strokeWidth={2} />
              <Line dataKey="expense" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="income" stroke="#16a34a" strokeWidth={2} />
              <Line dataKey="expense" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="charts-row-2">

        <div className="chart-box">
          <h3>Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={80}
                outerRadius={110}
                >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}

                <Label
                  content={({ viewBox }) => {
                    const { cx, cy } = viewBox;
                    return (
                      <text x={cx} y={cy} textAnchor="middle">
                        <tspan
                          x={cx}
                          dy="-5"
                          fill={profit >= 0 ? "#22c55e" : "#ef4444"}
                          fontSize="18"
                          fontWeight="bold"
                        >
                        ₹{profit}
                        </tspan>
                        <tspan x={cx} dy="20" fill="#ccc" fontSize="12">
                          {profit >= 0 ? "Profit" : "Loss"}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Major Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickFormatter={(value) =>
                value.length > 6 ? value.slice(0, 6) + "..." : value}/>
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Major Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickFormatter={(value) =>
                value.length > 6 ? value.slice(0, 8) + "..." : value}/>
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default Charts;