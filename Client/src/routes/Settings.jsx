import {useState} from 'react';
import {Avatar} from '@mui/material';

const Index = ()=> {
  const [lightTheme, setLightTheme] = useState(true);
    return (
        <>
   <div className="welcome">
        <Avatar sx={{ width: 55, height: 55 }}>DB</Avatar>
        <div>
          <div>Welcome to your account!</div>
          <p>
            You are now logged in. You can use the widgets on the side to enter
            and track data.
          </p>
          <button>Logout</button>
        </div>
      </div>
      <div className="account_widget">
        <div>
          <p>Export data to an excel file</p>
          <button>Export</button>
        </div>
        <div>
          <p>Import data from an excel file</p>
          <button>Import</button>
        </div>
        <div>
          <p>Delete your account and all data</p>
          <button>Delete</button>
        </div>
        <div>
          <p>Change your password</p>
          <button>Change</button>
          </div>

          <hr style = {{border: "1px solid black", width: "100%"}}/>

          <div>
            <p>Change the theme of the app</p>
            <button>{lightTheme? "Dark Mode": "Light Mode"}</button>
          </div>
      </div>
        </>
    )
}

export default Index;