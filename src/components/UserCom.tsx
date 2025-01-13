import { useState } from "react";
import Login from "./Login";
import UserNameAvatar from "./UserNameAvatar";

const style = {
    position: 'absolute',
    top: '2%',
    left: '2%',
    //transform: 'translate(-50%, -50%)',
};

const UserCom = () => {
    const [a, sa] = useState(true)
    return (<>
        <div style={style}>
            <UserNameAvatar />
            <Login />
        </div>
        {/* <button onClick={()=>{sa(!a)}}>ldlasfasd</button>
     {a && <div>dasgasdhgas</div>} */}
    </>)
}

export default UserCom