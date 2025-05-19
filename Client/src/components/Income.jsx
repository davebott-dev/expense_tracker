const Income = ({data}) => {
      const token = localStorage.getItem("token");
        const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const date = e.target.date.value;
    const amount = e.target.amount.value;
    const category = "Income";
    const toAccount = e.target.to_account?.value;

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
            toAccount,
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
        <div className="transaction_form">
        <form className="income_form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" required />
            </div>
            
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="transaction_amount" name="amount" required />
            </div>

            <label htmlFor="accounts">To Account:</label>
            <select name = "to_account" id="accounts" required>
                {data.Account?.length>0 ? data.Account?.map((account,index)=> {
                    return (
                        <option key={index} value={account.name}>
                            {account.name}
                        </option>
                    )
                }): (
                    <option value="none">No accounts available</option>
                )}
            </select>
            
            <div>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required />
            </div>
            
            <button type="submit">Add Income</button>
        </form>
        </div>
    );
    }
    export default Income;