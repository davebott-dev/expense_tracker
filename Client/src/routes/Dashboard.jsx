import { useState } from "react";
import { Avatar } from "@mui/material";
import Expense from "../components/Expense";
import Transfer from "../components/Transfer";
import Income from "../components/Income";

const Dashboard = () => {
  const [transactionType, setTransactionType] = useState(0);
  const [isActive, setIsActive] = useState("");

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
    setIsActive(type === 0 ? "expense" : type === 1 ? "transfer" : "income");
  };

  return (
    <>
      <div className="welcome">
        <Avatar sx={{ width: 55, height: 55 }}>DB</Avatar>
        <div>
          <div>Welcome to your account!</div>
          <p>
            You are now logged in. You can use the widgets on the side to enter
            and track data.
          </p>
          <button>Logout</button>
        </div>
      </div>
      <div className="widgets">
        <div>
          <div className="section_header">
            <h3>Net Worth </h3>
            <div>Net Worth</div>
          </div>
          <div className="account_widget">
            <div className="cash_account">
              <p>Cash</p>
              <p>Amount</p>
            </div>
            <div>
              <div>test wallet</div>
              <p>Amount</p>
            </div>
            <div className="bank_account">
              <p>Bank Account</p>
              <p>Amount</p>
            </div>
            <div></div>
            <div className="credit_account">
              <p>Credit Account</p>
              <p>Amount</p>
            </div>
            <div></div>
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
          <div>
            <div>
              <p>Transaction 1</p>
              <p>Amount</p>
              <p>Date</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
