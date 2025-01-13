import { useContext, useState } from "react"
import { UserContext } from "../App"
import UpdateUser from "./UpdateUser";
import { Box, Button, Modal, TextField } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

const Login = () => {
    const { user, userDispatch } = useContext(UserContext)
    //const [isLogin, setIsLogin] = useState(false)
    const [isShow, setIsShow] = useState(false)//to show the checking 
    const [isGood, setIsGood] = useState(true)//to show updating user
    const [name, setName] = useState('')
    //const [open, setOpen] = useState(true)


    const handleLogin = () => {
        console.log('in handle login');
        

        //setOpen(false)
        if (user.firstName != name) {
            setIsGood(false)
        }
        else {
            setIsGood(true)
        }
    }

    return (<>
        <button onClick={() => { setIsShow(!isShow) }}>login</button>
        {isShow &&
            <Modal open={isShow} onClose={() => { setIsShow(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <TextField label="name for checking" value={name} onChange={(e) => setName(e.target.value)} />
                    <Button onClick={handleLogin}>submit</Button>
                </Box>
            </Modal>
        }
        {!isGood && <UpdateUser />}
    </>)
}

export default Login
