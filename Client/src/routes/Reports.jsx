import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Avatar } from "@mui/material";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// set this up to show user data
const Index = () => {
  const [user] = useOutletContext();
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const token = localStorage.getItem("token");

    useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/getTransactions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("transactions",data.message);
        if (response.ok) {
          setTransactions( data.message);
        } else {
          console.error("Error fetching transactions:", data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    if (transactions.length === 0) return;
    const incomeByMonth = new Array(12).fill(0);
    const expensesByMonth = new Array(12).fill(0);

    transactions?.forEach((transaction) => {
      if(!transaction.date) return;
      const date = new Date(transaction.date);
      if(isNaN(date)) return;
      const month = date.getMonth();
      if (transaction.type.toLowerCase() === "income") {
        incomeByMonth[month] += transaction.amount;
      } else if (transaction.type.toLowerCase() === "expense") {
        expensesByMonth[month] += transaction.amount;
      }
    });
    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    setChartData({
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeByMonth,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Expenses",
          data: expensesByMonth,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    });
  }, [transactions]);

  return (
    <>
      <div className="welcome">
        {user.name ? (
          <Avatar sx={{ width: 55, height: 55 }}>
            {user.name.split(" ")[0][0] + user.name.split(" ")[1][0]}
          </Avatar>
        ) : (
          "loading"
        )}
        <div>
          <div>Welcome to your account!</div>
          <p>
            You are now logged in. You can use the widgets on the side to enter
            and track data.
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {chartData ? (
        <Line
          data={{ labels: chartData.labels, datasets: chartData.datasets }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Monthly Income and Expenses",
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  );
};

export default Index;
