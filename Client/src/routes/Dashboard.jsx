import { useState } from "react";
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
            <Accordion disableGutters elevation={0}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ backgroundColor: "#f5f5f5", margin: 0 }}
                className="accordion_summary"
              >
                <div className="cash_account">
                  <p>Cash</p>
                  <p>Amount</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>test wallet</div>
                <p>Amount</p>
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
                  <p>Amount</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>test </div>
                <p>test</p>
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
                  <p>Amount</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>test </div>
                <p>test</p>
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
