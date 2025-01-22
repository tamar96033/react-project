// import { useContext } from "react"
// import { UserContext } from "./App"

export type User={
    //שם פרטי, שם משפחה, מייל, סיסמא, כתובת, טלפון
    firstName?:string,
    lastName?:string,
    password?:string,
    email?:string,
    address?:string,
    phone?:string
}

type Action = {
    type: 'POST' | 'PUT' | 'REMOVE',
    data: Partial<User> 
}

export const userReducer=(
   state:User, action: Action
):User=>{
    
    switch(action.type){
        case 'PUT':
            const {firstName, lastName, password, email,  address, phone} = action.data as Partial<User>
           console.log('on update action of userReducer function');
           console.log('firstName: '+firstName);
           
            return{
                firstName:firstName,
                lastName:lastName,
                password:password,
                email:email,
                address:address,
                phone:phone
            }

    }
    return state
}
