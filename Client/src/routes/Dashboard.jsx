import {useState} from "react";
import {Avatar} from "@mui/material"

const Dashboard = () => {
  return (
    <>
      <div className = "welcome">
        <Avatar sx={{width:55, height:55}}>DB</Avatar>
        <div>
          <div>Welcome to your account!</div>
          <p>You are now logged in. You can use the widgets on the side to enter and track data.</p>
          <button>Logout</button>
        </div>
      </div>
      <div></div>
    </>
  );
};  
export default Dashboard;