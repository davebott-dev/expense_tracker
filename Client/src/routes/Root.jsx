import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import TuneIcon from "@mui/icons-material/Tune";

const Root = () => {
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.innerText);
    setIsActive(e.target.innerText.toLowerCase());
  };

  return (
    <>
      <header>
        <div>
          <div>
            <MonetizationOnIcon sx={{ fontSize: 45 }} />
          </div>
          <div>{title}</div>
        </div>
        <div>
          <AutorenewIcon sx={{ fontSize: 45 }} />
        </div>
      </header>
      <nav>
        <NavLink
          to="dashboard"
          onClick={handleTitleChange}
          className={isActive === "dashboard" ? "active title" : "title"}
        >
          <DashboardIcon sx={{ fontSize: 30 }} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="transactions"
          onClick={handleTitleChange}
          className={isActive === "transactions" ? "active title" : "title"}
        >
          <SyncAltIcon sx={{ fontSize: 30 }} />
          <span>Transactions</span>
        </NavLink>
        <NavLink
          to="accounts"
          onClick={handleTitleChange}
          className={isActive === "accounts" ? "active title" : "title"}
        >
          <CreditCardIcon sx={{ fontSize: 30 }} />
          <span>Accounts</span>
        </NavLink>
        <NavLink
          to="reports"
          onClick={handleTitleChange}
          className={isActive === "reports" ? "active title" : "title"}
        >
          <TableChartIcon sx={{ fontSize: 30 }} />
          <span>Reports</span>
        </NavLink>
        <NavLink
          to="budget"
          onClick={handleTitleChange}
          className={isActive === "budget" ? "active title" : "title"}
        >
          <ShoppingBasketIcon sx={{ fontSize: 30 }} />
          <span>Budget</span>
        </NavLink>
        <NavLink
          to="settings"
          onClick={handleTitleChange}
          className={isActive === "settings" ? "active title" : "title"}
        >
          <TuneIcon sx={{ fontSize: 30 }} />
          <span>Settings</span>
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Root;
