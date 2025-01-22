// import { FormEvent, useContext, useRef, useState } from "react"
// import { UserContext } from "./UserProvider"
// import { Box, Button, Modal, TextField } from "@mui/material"


// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   }

// const UpdateUser = () => {
//     const firstNameRef = useRef();
//     const lastNameRef = useRef();
//     const passwordRef = useRef();
//     const emailRef = useRef();
//     const phoneRef = useRef();

//     const { user, userDispatch } = useContext(UserContext)
//     const [open, setOpen] = useState(true)

//     const handleSubmit=(e:FormEvent)=>{
//         e.preventDefault();
//         console.log('handleSubmit: ');
        
//         setOpen(false);
//         userDispatch({
//             type:'UPDATE',
//             data:{
//                 firstName: firstNameRef.current?.value||'',
//                 lastName: lastNameRef,
//                 password: passwordRef,
//                 email: emailRef,
//                 phone: phoneRef
//             }
//         })
//     }

//     return (<>        
//         <Modal open={open} onClose={() => { setOpen(!open) }}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description">
//             <Box sx={style}>
//                 <TextField label="firstName" inputRef={firstNameRef}/>
//                 <TextField label="lastName" inputRef={lastNameRef}/>
//                 <TextField label="password" type="password" inputRef={passwordRef}/>
//                 <TextField label="email" type="email" inputRef={emailRef}/>
//                 <TextField label="phone" inputRef={phoneRef}/>
//                 <Button onClick={handleSubmit}>submit</Button>
//             </Box>
//         </Modal>
//     </>)
// }

// export default UpdateUser


import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./UserProvider";
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
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const { user, userDispatch } = useContext(UserContext);
    const [open, setOpen] = useState(true);

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
            const response = await fetch('http://localhost:3000/api/user/register', {
                method: 'POST', // or 'POST' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': user.id?.toString(), // כולל את ה-user ID בכותרות
                },
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            userDispatch({ type: 'PUT', data: updatedUser }); // Dispatch updated user to context
            alert('User updated successfully!'); // Show success message
            setOpen(false); // Close the modal
        } catch (error: any) {
            console.error('Update failed:', error.message);
            alert(error.message); // Show error message
        }
    };

    return (
        <Modal open={open} onClose={() => { setOpen(false); }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <TextField label="First Name" inputRef={firstNameRef} defaultValue={user.firstName} />
                <TextField label="Last Name" inputRef={lastNameRef} defaultValue={user.lastName} />
                <TextField label="Password" type="password" inputRef={passwordRef} />
                <TextField label="Email" type="email" inputRef={emailRef} defaultValue={user.email} />
                <TextField label="Phone" inputRef={phoneRef} defaultValue={user.phone} />
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </Modal>
    );
};

export default UpdateUser;