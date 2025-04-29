import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import BlobBackground from "../components/BlobBackground";
import "../App.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (location.state?.showSuccessSnackbar) {
        setOpen(true);
      }
    }, [location.state]);


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };

  const handleSubmit = async (e)=> {
    e.preventDefault();
    const username=  e.target.username.value;
    const password=  e.target.password.value;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        setLoading(false);
        navigate(`/${username}/dashboard`);
      } else {
        setLoading(false);
        setError(data.error || "Login failed");
        setOpen(true);
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.",err);
      setOpen(true);
    }
  }

return (
    <div className="pageCont">
      <div>
        <h2>Sign In</h2>
        <form onSubmit ={handleSubmit} >
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