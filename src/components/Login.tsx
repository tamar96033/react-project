import { FormEvent, useContext, useRef, useState } from "react"
import { UserContext, UserContextType } from "./UserProvider"
import { Box, Button, Modal, SxProps, TextField, Theme } from "@mui/material";

const style: SxProps<Theme> = {
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
    const { user, userDispatch } = useContext<UserContextType | undefined>(UserContext) || { user: null, userDispatch: () => {} };
   
    const [isShow, setIsShow] = useState(false)

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/user/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: nameRef.current?.value || '',
                    password: passwordRef.current?.value || ''
                }),
            });

            const data = await response.json();            

            if (!response.ok) {
                throw new Error(data.message);
            }
            userDispatch({ type: 'PUT', data: data.user }); 
            setIsShow(false)

        } catch (error: any) {
            alert('the user is not in the DB');
        }
    };


    return (<>
        <Button onClick={() => { setIsShow(!isShow) }}>login</Button>
        {isShow &&
            <Modal open={isShow} onClose={() => { setIsShow(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <TextField label="name for checking" inputRef={nameRef} defaultValue={user?.firstName} />
                    <TextField label="password for checking" type="password" inputRef={passwordRef} defaultValue={user?.password} />
                    <Button onClick={handleSubmit}>submit</Button>
                </Box>
            </Modal>
        }
    </>)
}



export default Login
