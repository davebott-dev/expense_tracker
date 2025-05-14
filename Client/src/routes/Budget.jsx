import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Avatar } from "@mui/material";

const Index = () => {
  const [user] = useOutletContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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
    </>
  );
};

export default Index;

//add budget components 