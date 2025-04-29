import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import BlobBackground from "../components/BlobBackground";
import "../App.css";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmpassword.value;
    const name = e.target.name.value;

    if(password===confirmPassword) {    
    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, name }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          navigate("/login", {state:{showSuccessSnackbar:true}});
        } else {
          setError(data.msg);
          setOpen(true);
        }
      }
    } catch (err) {
      console.error(err);
      setError("An Error Occured During Login...");
      setOpen(true);
    }
  } else {
    setOpen(true);
    setError("Passwords Do Not Match!!!!")
  }
  };
  return (
    <div className="pageCont">
      <div>
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
          />

          <button className="form-btn">Sign Up</button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            {error ? (
              <Alert severity="error" onClose={handleClose}>
                {error}
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="success">
                {" "}
                Success
              </Alert>
            )}
          </Snackbar>
        </form>
        <span>
          Already have an account?<Link to="/login"> Sign in</Link>
        </span>
      </div>
      <div>
        <BlobBackground />
      <div className="title-card">
          <h1>Welcome to Expense Tracker!</h1>
          <p>The premier financial tracker for web users!</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;