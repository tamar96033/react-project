import { createContext, useReducer } from 'react'
import './App.css'
import { User, userReducer } from './user'
import UserCom from './components/UserCom';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './Router';

export const UserContext = createContext({})

function App() {

  const [user, userDispatch] = useReducer(userReducer, {} as User);


  return (<>
    <UserContext.Provider value={{ user, userDispatch }}>
      <UserCom />
    </UserContext.Provider>

    <RouterProvider router={myRouter}/>
  </>)
}

export default App
