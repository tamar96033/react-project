import { Avatar } from "@mui/material"
import { useContext, useState } from "react"
import { UserContext } from "./UserProvider"
import UpdateUser from "./UpdateUser";


// const style = {
//     position: 'absolute',
//     top: '2%',
//     left: '2%',
//     //transform: 'translate(-50%, -50%)',
// };

const UserNameAvatar = () => {
    const { user, userDispatch } = useContext(UserContext)

    const [show, setShow] = useState(false)

    return (<>
        <div>
            hello {user.firstName}
            <Avatar>{user.firstName?.charAt(0)}</Avatar>
            <button onClick={() => { setShow(!show) }}>update</button>
            {show && <UpdateUser />}
        </div>

    </>)
}
export default UserNameAvatar