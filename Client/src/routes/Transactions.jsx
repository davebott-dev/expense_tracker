import { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Paper,
} from "@mui/material";

const Index = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

      <div>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            {" "}
            New +
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{ paper: { 
                component: 'form',
                onSubmit: (e) => {
                  e.preventDefault();
                  // Handle form submission logic here
                  console.log("Form submitted");
                  handleClose(); // Close the dialog after submission
                } }}}
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
                label="Transaction Description"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="date"
                label="Date"
                type="date"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="category"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
              />
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
              </TableRow>
            </TableHead>
            <TableBody>{/* Add your transaction data here */}</TableBody>
          </Table>
        </TableContainer>
        <div>Total Income:</div>
        <div>Total Expense:</div>
        <div>Net Income:</div>
      </div>
    </>
  );
};

export default Index;
