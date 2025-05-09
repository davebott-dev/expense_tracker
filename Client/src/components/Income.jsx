const Income = ({data}) => {
    console.log(data);
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

            <label htmlFor="accounts">To Account:</label>
            <select name = "to_account" id="accounts" required>
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
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required />
            </div>
            
            <button type="submit">Add Income</button>
        </form>
        </div>
    );
    }
    export default Income;