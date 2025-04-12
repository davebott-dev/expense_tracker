const Income = () => {
    return (
        <div className="transaction_form">
        <form>
            <div>
                <label htmlFor="source">Source:</label>
                <input type="text" id="source" name="source" required />
            </div>
            
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="transaction_amount" name="amount" required />
            </div>
            
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