import {useState} from 'react';

const Index = ()=> {
    const [num,setNum] = useState(0);

    return (
        <main>
        <div>Hello World</div>
        <div>{num}</div>
        <button onClick={()=> setNum(prev=>prev+1)}>Increment</button>
        </main>
    )
}

export default Index;