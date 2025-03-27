import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Root = () => {

  return (
    <>
      <header>
        <div>
          <div>Tab 1</div>
          <div>Tab 2</div>
        </div>
        <div>Tab 3</div>
      </header>
      <nav>
        <div>
          <img src="#" alt="" height="30" width="30"/>
          <NavLink to="dashboard">Dashboard</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
        <NavLink>Transactions</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
        <NavLink>Accounts</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
          <NavLink>Reports</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
          <NavLink>Budget</NavLink>
        </div>
        <div>
        <img src="#" alt="" height="30" width="30"/>
          <NavLink>Settings</NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Root;
