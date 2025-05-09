const Transfer = ({ data,children }) => {
    return (
        <div className="transfer">
        <form>
        <label htmlFor="from_account">From Account:</label>
            <select name = "from_account" id="from_account" required>
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
    
            <div>
            <label htmlFor="to_account">To Account:</label>
            <select name = "to_account" id="to_account" required>
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