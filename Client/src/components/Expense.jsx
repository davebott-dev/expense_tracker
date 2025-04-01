const Expense = () => {
  return (
    <div className="expense">
      <form className="expense_form">
        <div>
            <div>
                <label htmlFor="from">From:</label>
                <select id="from" name="from_account">
                  <option value="account1">Account 1</option>
                  <option value="account2">Account 2</option>
                  <option value="account3">Account 3</option>
                </select>
            </div>
            <div>
                <input type="number" id="amount" name="amount" required />
                <div>USD</div>
            </div>
        </div>
        <div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" required />
            </div>
            <input type="date" id="date" name="date" required />
        </div>

        <button type="submit" className="expense_button">Add Expense</button>
      </form>
    </div>
  );
};
export default Expense;
