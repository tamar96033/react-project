import { createContext, ReactNode, useReducer } from 'react';
import { User, userReducer } from '../user';

export const UserContext = createContext({});

const UserProvider = ({ children }:{ children: ReactNode }) => {
    const [user, userDispatch] = useReducer(userReducer, {} as User);

    return (
        <UserContext.Provider value={{ user, userDispatch }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider