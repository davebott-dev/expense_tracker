const Transfer = ({ children }) => {
    return (
        <div className="transfer">
        <form>
            <div>
                <label htmlFor="fromAccount">From Account:</label>
                <select id="fromAccount" name="fromAccount">
                <option value="account1">Account 1</option>
                <option value="account2">Account 2</option>
                <option value="account3">Account 3</option>
                </select>
            </div>
    
            <div>
                <label htmlFor="toAccount">To Account:</label>
                <select id="toAccount" name="toAccount">
                <option value="account1">Account 1</option>
                <option value="account2">Account 2</option>
                <option value="account3">Account 3</option>
                </select>
            </div>
    
            <div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" required />
                </div>
                <button type="submit">Transfer</button>
            </div>
        </form>
        {children}
        </div>
    );
    }
    export default Transfer;