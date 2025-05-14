import { useState } from "react";
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

const Index = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Expenses",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Income",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: "rgb(153, 102, 255)",
        borderColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "User Expenses & Income Over Time",
        },
      },
    },
  };
  const [user] = useOutletContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
      <div className="welcome">
      {user.name? <Avatar sx={{ width: 55, height: 55 }}>
          {user.name.split(" ")[0][0] + user.name.split(" ")[1][0]}
        </Avatar>: "loading"}
        <div>
          <div>Welcome to your account!</div>
          <p>
            You are now logged in. You can use the widgets on the side to enter
            and track data.
          </p>
          <button onClick = {handleLogout}>Logout</button>
        </div>
      </div>

      <Line data={data} options={data.options} />
    </>
  );
};

export default Index;

// make chart show user data