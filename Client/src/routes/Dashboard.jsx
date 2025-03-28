import {useState} from "react";

const Dashboard = () => {
  return (
    <>
      <div className = "welcome">
        <div>Avatar</div>
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