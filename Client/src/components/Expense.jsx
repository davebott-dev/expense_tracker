const Expense = ({ data }) => {
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const date = e.target.date.value;
    const amount = e.target.amount.value;
    const category = "Expense";
    const fromAccount = e.target.from_account?.value;

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
            fromAccount,
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
  };
  return (
    <div className="expense">
      <form className="expense_form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="accounts">From Account:</label>
            <select name="from_account" id="from_accounts" required>
              {data.Account?.length > 0 ? (
                data.Account?.map((account, index) => {
                  return (
                    <option key={index} value={account.name}>
                      {account.name}
                    </option>
                  );
                })
              ) : (
                <option value="none">No accounts available</option>
              )}
            </select>
          </div>
          <div className="expense_amount">
            <label htmlFor="expense_amount">Amount:</label>
            <input type="number" id="expense_amount" name="amount" required />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" required />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" required />
          </div>
        </div>

        <button type="submit" className="expense_button">
          Add Expense
        </button>
      </form>
    </div>
  );
};
export default Expense;
