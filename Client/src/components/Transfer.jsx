const Transfer = ({ children }) => {
    return (
        <div className="transfer">
        <h2>Transfer</h2>
        <form>
            <label htmlFor="fromAccount">From Account:</label>
            <select id="fromAccount" name="fromAccount">
            <option value="account1">Account 1</option>
            <option value="account2">Account 2</option>
            <option value="account3">Account 3</option>
            </select>
    
            <label htmlFor="toAccount">To Account:</label>
            <select id="toAccount" name="toAccount">
            <option value="account1">Account 1</option>
            <option value="account2">Account 2</option>
            <option value="account3">Account 3</option>
            </select>
    
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required />
    
            <button type="submit">Transfer</button>
        </form>
        {children}
        </div>
    );
    }
    export default Transfer;