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

// interface ActionType {
//     type: string;
//     payload?: any;
// }


const Login = () => {
    const { user, userDispatch } = useContext<UserContextType | undefined>(UserContext) || { user: null, userDispatch: () => {} };
   
    const [isShow, setIsShow] = useState(false)
    const [isGood, setIsGood] = useState(true)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');


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
            console.log('data ',data);
            console.log(data.user);
            

            if (!response.ok) {
                throw new Error(data.message);
            }
            userDispatch({ type: 'PUT', data: data.user }); //{ id: data.userId, firstName: nameRef.toString() }// Dispatch user to context
            console.log(user)
            setIsShow(false)

        } catch (error: any) {
            alert('the user is not in the DB');
            
            //console.error('Login failed:', error?.message);
        }
    };


    return (<>
        <Button onClick={() => { setIsShow(!isShow) }}>login</Button>
        {isShow &&
            <Modal open={isShow} onClose={() => { setIsShow(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <TextField label="name for checking" inputRef={nameRef} onChange={(e) => setName(e.target.value)} defaultValue={user?.firstName} />
                    <TextField label="password for checking" type="password" inputRef={passwordRef} onChange={(e) => setPassword(e.target.value)} defaultValue={user.password} />
                    <Button onClick={handleSubmit}>submit</Button>
                </Box>
            </Modal>
        }
        {/* {!isGood && <UpdateUser />} */}
    </>)
}



export default Login
