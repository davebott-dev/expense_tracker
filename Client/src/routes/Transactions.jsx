import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

//add a "from" and "to" field to the transaction form if the type is transfer
// add only a "from" field to the transaction form if the type is expense
// add only a "to" field to the transaction form if the type is income
const Index = () => {
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [user] = useOutletContext();
  const [transactions, setTransactions] = useState(user.Transactions);
  const groups = ["Expense", "Income", "Transfer"];
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/getTransactions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data.message);
        if (response.ok) {
          setTransactions(data.message);
        } else {
          console.error("Error fetching transactions:", data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

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

      <div>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            {" "}
            New +
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                component: "form",
                onSubmit: async (e) => {
                  e.preventDefault();
                  const description = e.target.description.value;
                  const date = e.target.date.value;
                  const amount = e.target.amount.value;
                  const category = e.target.Category.value;

                  try {
                    const response = await fetch(
                      "http://localhost:8080/api/createTransaction",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          description,
                          date,
                          amount,
                          category,
                        }),
                      }
                    );
                    const data = await response.json();
                    if (response.ok) {
                      if (data.success) {
                        console.log("Transaction added successfully:", data);
                        window.location.reload();
                      }
                    } else {
                      console.error("Error adding transaction:", data);
                    }
                  } catch (error) {
                    console.error("Error adding transaction:", error);
                  }
                  handleClose();
                },
              },
            }}
          >
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add a new transaction, please fill in the details below.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Transaction Description"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="date"
                label="Date"
                name="date"
                type="date"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="amount"
                label="Amount"
                name="amount"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="Category"
                label="Category"
                name="Category"
                select
                fullWidth
                variant="standard"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                {groups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
              {selectedGroup === "Transfer" && (
                <TextField
                  margin="dense"
                  id="fromAccount"
                  label="From Account"
                  name="fromAccount"
                  select
                  fullWidth
                  variant="standard"
                >
                  {user.Account?.map((account, index) => {
                    return (
                      <MenuItem key={index} value={account.name}>
                        {account.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
              {selectedGroup === "Transfer" && (
                <TextField
                  margin="dense"
                  id="toAccount"
                  label="To Account"
                  name="toAccount"
                  select
                  fullWidth
                  variant="standard"
                >
                  {user.Account?.map((account, index) => {
                    return (
                      <MenuItem key={index} value={account.name}>
                        {account.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
              {selectedGroup === "Expense" && (
                <TextField
                  margin="dense"
                  id="fromAccount"
                  label="From Account"
                  name="fromAccount"
                  select
                  fullWidth
                  variant="standard"
                >
                  {user.Account?.map((account, index) => {
                    return (
                      <MenuItem key={index} value={account.name}>
                        {account.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
              {selectedGroup === "Income" && (
                <TextField
                  margin="dense"
                  id="toAccount"
                  label="To Account"
                  name="toAccount"
                  select
                  fullWidth
                  variant="standard"
                >
                  {user.Account?.map((account, index) => {
                    return (
                      <MenuItem key={index} value={account.name}>
                        {account.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction Description</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Path</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((transaction, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {transaction.description}
                    </TableCell>
                    <TableCell align="right">{transaction.date}</TableCell>
                    <TableCell align="right">${transaction.amount}</TableCell>
                    <TableCell align="right">{transaction.type}</TableCell>
                    <TableCell align="right">
                      {transaction.type == "Transfer" ? (
                        <span>
                          {transaction.fromAccount} to {transaction.toAccount}
                        </span>
                      ) : transaction.type == "Expense" ? (
                        <span>{transaction.fromAccount}</span>
                      ) : (
                        <span>{transaction.toAccount}</span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          Total Income:{" "}
          <strong>
            $
            {transactions
              ?.filter((el) => el.type == "Income")
              .reduce((accum, curr) => accum + curr.amount, 0)}
          </strong>
        </div>
        <div>
          Total Expense:{" "}
          <strong>
            $
            {transactions
              ?.filter((el) => el.type == "Expense")
              .reduce((accum, curr) => accum + curr.amount, 0)}
          </strong>
        </div>
        <div>
          Total Transfer:{" "}
          <strong>
            $
            {transactions
              ?.filter((el) => el.type == "Transfer")
              .reduce((accum, curr) => accum + curr.amount, 0)}
          </strong>
        </div>
        <div>
          Net Income:{" "}
          <strong>
            $
            {transactions
              ?.filter((el) => el.type == "Income")
              .reduce((accum, curr) => accum + curr.amount, 0) -
              transactions
                ?.filter((el) => el.type == "Expense")
                .reduce((accum, curr) => accum + curr.amount, 0) +
              transactions
                ?.filter((el) => el.type == "Transfer")
                .reduce((accum, curr) => accum + curr.amount, 0)}
          </strong>
        </div>
      </div>
    </>
  );
};

export default Index;

//delete data from database and update prisma schema to include to and from accounts...then update dashboard