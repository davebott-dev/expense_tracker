import {useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';

const Root = ()=> {
    const [num,setNum] = useState(0);

    return (
        <>
        <header>
            <div>
                <div>Tab 1</div>
                <div>Tab 2</div>
            </div>
            <div>Tab 3</div>
        </header>
        <nav>
            <div>Dashboard</div>
            <div>Transactions</div>
            <div>Accounts</div>
            <div>Reports</div>
            <div>Budget</div>
            <div>Settings</div>
        </nav>
        <Outlet />
        </>
    )
}
export default Root;