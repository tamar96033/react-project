import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext, UserContextType } from "./UserProvider";
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
};

const UpdateUser = () => {

    const [showForm, setShowForm] = useState(false)

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const { user, userDispatch } = useContext<UserContextType | undefined>(UserContext) || { user: null, userDispatch: () => { } };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const updatedUser = {
            firstName: firstNameRef.current?.value || '',
            lastName: lastNameRef.current?.value || '',
            password: passwordRef.current?.value || '',
            email: emailRef.current?.value || '',
            phone: phoneRef.current?.value || '',
        };

        try {
            const response = await fetch('http://localhost:3000/api/user/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': user?.id?.toString() ?? '0'
                },
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

        
            console.log('user',user);

            userDispatch({ type: 'PUT', data: { id: user?.id ?? 0, ...updatedUser } }); // Dispatch updated user to context
            
            alert('User updated successfully!'); // Show success message
           
            setShowForm(false)    
        } catch (error: any) {
            console.error('Update failed:', error.message);
            alert(error.message); 
        }

    };
    
    useEffect(() => {
        console.log("Updated user:", user);
    }, [user]);

    return (<>
        {!showForm && <Button onClick={() => { setShowForm(true) }}>update</Button>}

        {/* {showForm && <EntriesForm method="PUT"/>} */}
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
    </>);
};

export default UpdateUser;