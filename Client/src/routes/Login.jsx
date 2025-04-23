import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import BlobBackground from "../components/BlobBackground";
import "../App.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };

return (
    <div className="pageCont">
      <div>
        <h2>Sign In</h2>
        <form >
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button className="form-btn" disabled={loading}>
            {loading ? "Please Wait" : "Sign in"}
          </button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            {error ? (
              <Alert onClose={handleClose} severity="error">
                {error}
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="success">
                Signup Successful! Please Log in.
              </Alert>
            )}
          </Snackbar>
        </form>
        <span>
          Don't have an account?<Link to="/signup"> Sign up</Link>
        </span>
      </div>
      <div >
      <BlobBackground />
        <div className="title-card">
          <h1>Welcome to Expense Tracker!</h1>
          <p>The premier financial tracker for web users!</p>
        </div>
      </div>
    </div>
  );
};
export default Login;