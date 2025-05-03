import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  MenuItem
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

//figure out the 500 internal server error
const Index = () => {
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [user] = useOutletContext();
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

  const groups = ["Cash", "Assets", "Credit", "Banking"];

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
        <div className="section_header">
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
                    const name = e.target.Name.value;
                    const group = selectedGroup;
                    const balance = e.target.Balance.value;
                    const userId = user.id;

                    try {
                      const response = await fetch(
                        "http://localhost:8080/api/createAccount",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            name,
                            group,
                            balance,
                            userId,
                          }),
                        }
                      );
                      const data = await response.json();
                      if (response.ok) {
                        console.log("Account created successfully:", data);
                      } else {
                        console.error("Error creating account:", data);
                      }
                    } catch (error) {
                      console.error("Error creating account:", error);
                    }
                    handleClose();
                  },
                },
              }}
            >
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add a new Account, please fill in the details below.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="Name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="Group"
                  label="Group"
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
                <TextField
                  margin="dense"
                  id="Balance"
                  label="Balance"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </Dialog>
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
                <p>Assets</p>
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
                <p>Credit</p>
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
                <p>Banking Account</p>
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
    </>
  );
};

export default Index;
