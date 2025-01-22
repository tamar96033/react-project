import { FormEvent, useContext, useRef, useState } from "react"
import { UserContext } from "./UserProvider"
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
    const [password, setPassword] = useState('');
    //const [open, setOpen] = useState(true)


    // const handleLogin = () => {
    //     console.log('in handle login');
        

    //     //setOpen(false)
    //     if (user.firstName != name) {
    //         setIsGood(false)
    //     }
    //     else {
    //         setIsGood(true)
    //     }
    // }
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: nameRef.current?.value || '', // Use .current?.value
                    password: passwordRef.current?.value || '' // Use .current?.value
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            userDispatch({ type: 'PUT', payload: { id: data.userId, nameRef } }); // Dispatch user to context
            alert(data.message); // Show success message
        } catch (error: any) {
            console.error('Login failed:', error?.message);
            alert(error.message); // Show error message
            
        }
    };


    return (<>
        <button onClick={() => { setIsShow(!isShow) }}>login</button>
        {isShow &&
            <Modal open={isShow} onClose={() => { setIsShow(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <TextField label="name for checking" inputRef={nameRef} onChange={(e) => setName(e.target.value)}  defaultValue={user.firstName}/>
                    <TextField label="password for checking" type="password" inputRef={passwordRef} onChange={(e) => setPassword(e.target.value)}  defaultValue={user.password}/>
                    <Button onClick={handleSubmit}>submit</Button>
                </Box>
            </Modal>
        }
        {!isGood && <UpdateUser />}
    </>)
}

export default Login
