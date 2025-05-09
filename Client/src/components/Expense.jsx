const Expense = ({data}) => {
  return (
    <div className="expense">
      <form className="expense_form">
        <div>
          <div>
          <label htmlFor="accounts">From Account:</label>
            <select name = "from_account" id="from_accounts" required>
                {data.accounts?.length>0 ? data.accounts?.map((account,index)=> {
                    return (
                        <option key={index} value={account._id}>
                            {account.name}
                        </option>
                    )
                }): (
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
