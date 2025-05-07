import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Expense from "../components/Expense";
import Transfer from "../components/Transfer";
import Income from "../components/Income";

const Dashboard = () => {
  const [transactionType, setTransactionType] = useState(0);
  const [isActive, setIsActive] = useState("");
  const [user] = useOutletContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
    setIsActive(type === 0 ? "expense" : type === 1 ? "transfer" : "income");
  };
  //fix transaction form in the dashboard?
  return (
    <>
      <div className="welcome">
        {user.name ? (
          <Avatar sx={{ width: 55, height: 55 }}>
            {user.name.split(" ")[0][0] + user.name.split(" ")[1][0]}
          </Avatar>
        ) : (
          "loading"
        )}
        <div>
          <div>Welcome to your account!</div>
          <p>
            You are now logged in. You can use the widgets on the side to enter
            and track data.
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="widgets">
        <div>
          <div className="section_header">
            <h3>Net Worth </h3>
            <div> $
              {user.Account?.filter((el) => el.accountType == "Cash").reduce(
                (accum, curr) => accum + curr.balance,
                0
              ) +
                user.Account?.filter(
                  (el) => el.accountType == "Banking"
                ).reduce((accum, curr) => accum + curr.balance, 0) -
                user.Account?.filter((el) => el.accountType == "Credit").reduce(
                  (accum, curr) => accum + curr.balance,
                  0
                )}
            </div>
          </div>
          <div className="account_widget">
            <Accordion disableGutters elevation={0}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ backgroundColor: "#f5f5f5", margin: 0 }}
                className="accordion_summary"
              >
                <div className="cash_account">
                  <p>Cash</p>
                  <p>
                    {" "}
                    $
                    {user.Account?.filter(
                      (el) => el.accountType == "Cash"
                    ).reduce((accum, curr) => accum + curr.balance, 0)}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {user.Account?.filter((el) => el.accountType == "Cash").map(
                  (account, index) => {
                    return (
                      <div key={index} className="account_details">
                        <p>{account.name}</p>
                        <strong>
                          <p>${account.balance}</p>
                        </strong>
                      </div>
                    );
                  }
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ backgroundColor: "#f5f5f5", margin: 0 }}
                className="accordion_summary"
              >
                <div className="bank_account">
                  <p>Bank Account</p>
                  <p>
                    {" "}
                    $
                    {user.Account?.filter(
                      (el) => el.accountType == "Banking"
                    ).reduce((accum, curr) => accum + curr.balance, 0)}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {user.Account?.filter((el) => el.accountType == "Banking").map(
                  (account, index) => {
                    return (
                      <div key={index} className="account_details">
                        <p>{account.name}</p>
                        <strong>
                          <p>${account.balance}</p>
                        </strong>
                      </div>
                    );
                  }
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ backgroundColor: "#f5f5f5", margin: 0 }}
                className="accordion_summary"
              >
                <div className="credit_account">
                  <p>Credit Account</p>
                  <p>
                    {" "}
                    $
                    {user.Account?.filter(
                      (el) => el.accountType == "Credit"
                    ).reduce((accum, curr) => accum + curr.balance, 0)}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {user.Account?.filter((el) => el.accountType == "Credit").map(
                  (account, index) => {
                    return (
                      <div key={index} className="account_details">
                        <p>{account.name}</p>
                        <strong>
                          <p>${account.balance}</p>
                        </strong>
                      </div>
                    );
                  }
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div>
          <div>
            <div className="section_header">
              <h3>New Transaction </h3>
            </div>
            <div className="transaction_widget">
              <div className="transaction_type">
                <div
                  onClick={() => handleTransactionTypeChange(0)}
                  className={isActive == "expense" ? "expense_transaction" : ""}
                >
                  Expense
                </div>
                <div
                  onClick={() => handleTransactionTypeChange(1)}
                  className={
                    isActive == "transfer" ? "transfer_transaction" : ""
                  }
                >
                  Transfer
                </div>
                <div
                  onClick={() => handleTransactionTypeChange(2)}
                  className={isActive == "income" ? "income_transaction" : ""}
                >
                  Income
                </div>
              </div>
              {transactionType === 0 && <Expense />}
              {transactionType === 1 && (
                <Transfer>
                  <p>Note: Make sure to select the correct accounts.</p>
                </Transfer>
              )}
              {transactionType === 2 && <Income />}
            </div>
          </div>
          <div className="section_header">
            <h3>Recent Transaction </h3>
          </div>
          <div className="section_body">
            <div>
              <div>
                <p>Date</p>
                <p>Transaction</p>
              </div>
              <p>Amount</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
