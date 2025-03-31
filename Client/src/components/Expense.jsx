
const Expense = () => {
    return (
        <div className="expense">
        <h2>Expense</h2>
        <form className="expense_form">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" required />
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" required />
            <button type="submit">Add Expense</button>
        </form>
        </div>
    );
    }
    export default Expense;