import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Root = () => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.innerText);
  }

  return (
    <>
      <header>
        <div>
          <div><MonetizationOnIcon sx={{fontSize: 45}} /></div>
          <div>{title}</div>
        </div>
        <div><AutorenewIcon sx={{fontSize:45}}/></div>
      </header>
      <nav>
        <div>
          <img src="#" alt="" height="30" width="30"/>
          <NavLink to="dashboard" onClick = {handleTitleChange}>Dashboard</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
        <NavLink onClick = {handleTitleChange}>Transactions</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
        <NavLink onClick = {handleTitleChange}>Accounts</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
          <NavLink onClick = {handleTitleChange}>Reports</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
          <NavLink onClick = {handleTitleChange}>Budget</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
          <NavLink onClick = {handleTitleChange}>Settings</NavLink>
        </div>
      </nav>
      <main><Outlet/></main>
    </>
  );
};
export default Root;
