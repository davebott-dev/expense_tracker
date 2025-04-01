const Income = () => {
    return (
        <div className="transaction_form">
        <form>
            <label htmlFor="source">Source:</label>
            <input type="text" id="source" name="source" required />
            
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required />
            
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" required />
            
            <button type="submit">Add Income</button>
        </form>
        </div>
    );
    }
    export default Income;