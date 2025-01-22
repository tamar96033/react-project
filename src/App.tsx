import { createContext, useReducer } from 'react'
import './App.css'
import { User, userReducer } from './user'
import UserCom from './components/UserCom';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './Router';
// import ConnectingDB from './components/ConnectingDB';
import UserProvider from './components/UserProvider';

//export const UserContext = createContext({})

function App() {

  // const [user, userDispatch] = useReducer(userReducer, {} as User);


  return (<>
    {/* <UserContext.Provider value={{ user, userDispatch }}>
      <UserCom />
    </UserContext.Provider> */}

    <UserProvider>
      <UserCom/>
    </UserProvider>

    <RouterProvider router={myRouter}/>

    {/* <ConnectingDB/> */}
  </>)
}

export default App
