import { Avatar } from "@mui/material"
import { useContext } from "react"
import { UserContext, UserContextType } from "./UserProvider"




const UserNameAvatar = () => {

    const { user } = useContext<UserContextType | undefined>(UserContext) || { user: null, userDispatch: () => { } };

    return (<>
        <div>
            hello {user?.firstName}
            <Avatar>{user?.firstName?.charAt(0)}</Avatar>
        </div>

    </>)
}
export default UserNameAvatar