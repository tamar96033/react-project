import { FormEvent, useContext, useRef, useState } from "react"
import { UserContext } from "../App"
import { Box, Button, Modal, TextField } from "@mui/material"


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

const UpdateUser = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const { user, userDispatch } = useContext(UserContext)
    const [open, setOpen] = useState(true)

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault();
        console.log('handleSubmit: ');
        
        setOpen(false);
        userDispatch({
            type:'UPDATE',
            data:{
                firstName: firstNameRef.current?.value||'',
                lastName: lastNameRef,
                password: passwordRef,
                email: emailRef,
                phone: phoneRef
            }
        })
    }

    return (<>        
        <Modal open={open} onClose={() => { setOpen(!open) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <TextField label="firstName" inputRef={firstNameRef}/>
                <TextField label="lastName" inputRef={lastNameRef}/>
                <TextField label="password" type="password" inputRef={passwordRef}/>
                <TextField label="email" type="email" inputRef={emailRef}/>
                <TextField label="phone" inputRef={phoneRef}/>
                <Button onClick={handleSubmit}>submit</Button>
            </Box>
        </Modal>
    </>)
}

export default UpdateUser