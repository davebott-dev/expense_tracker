import {useState} from 'react';

const App = ()=> {
    const [num,setNum] = useState(0);

    return (
        <>
        <div>Hello World</div>
        <div>{num}</div>
        <button onClick={()=> setNum(prev=>prev+1)}>Increment</button>
        </>
    )
}

export default App;