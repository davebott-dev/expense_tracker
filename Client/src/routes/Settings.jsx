import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Avatar } from "@mui/material";

const Index = () => {
  const [lightTheme, setLightTheme] = useState(true);
  const [user] = useOutletContext();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleUserDelete = async(id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if(confirmDelete) {
      try{
    const response = await fetch(`http://localhost:8080/api/${id}/delete-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      alert("Account deleted successfully");
      localStorage.removeItem("token");
      window.location.reload();
    }
    else {
      alert("Error deleting account");
    }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="account_widget">
        <div>
          <p>Export data to an excel file</p>
          <button>Export</button>
        </div>
        <div>
          <p>Import data from an excel file</p>
          <button>Import</button>
        </div>
        <div>
          <p>Delete your account and all data</p>
          <button onClick={()=>handleUserDelete(user.id)}>Delete</button>
        </div>
        <div>
          <p>Change your password</p>
          <button>Change</button>
        </div>

        <hr style={{ border: "1px solid black", width: "100%" }} />

        <div>
          <p>Change the theme of the app</p>
          <button>{lightTheme ? "Dark Mode" : "Light Mode"}</button>
        </div>
      </div>
    </>
  );
};

export default Index;

// make settings page functional