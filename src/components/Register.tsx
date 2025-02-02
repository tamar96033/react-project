import { Box, Button, Modal, TextField } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react"
import { UserContextType, UserContext } from "./UserProvider";


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
};


const Register = () => {

    const [showForm, setShowForm] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const { user, userDispatch } = useContext<UserContextType | undefined>(UserContext) || { user: null, userDispatch: () => { } };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const updatedUser = {
            firstName: firstNameRef.current?.value || '',
            lastName: lastNameRef.current?.value || '',
            password: passwordRef.current?.value || '',
            email: emailRef.current?.value || '',
            phone: phoneRef.current?.value || '',
        };
        try {
            const response = await fetch('http://localhost:3000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstNameRef.current?.value || "",
                    password: passwordRef.current?.value || "",
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            console.log("Dispatching:", { id: data.userId, ...updatedUser });
            //I must change the type for post!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            userDispatch({ type: 'POST', data: { id: data.userId, ...updatedUser } });

            alert('User updated successfully!');
            setShowForm(false)
        } catch (error: any) {
            console.error('Update failed:', error.message);
            alert(error.message);
        }
    }

    return (<>
        {!showForm && <Button onClick={() => { setShowForm(true) }}>register</Button>}
        {showForm && <Modal open={showForm} //onClose={() => { setShowForm(false); }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <TextField label="First Name" inputRef={firstNameRef} defaultValue={user?.firstName} />
                <TextField label="Last Name" inputRef={lastNameRef} defaultValue={user?.lastName} />
                <TextField label="Password" type="password" inputRef={passwordRef} />
                <TextField label="Email" type="email" inputRef={emailRef} defaultValue={user?.email} />
                <TextField label="Phone" inputRef={phoneRef} defaultValue={user?.phone} />
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </Modal>}
    </>)
}

export default Register
