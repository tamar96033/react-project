import { createBrowserRouter } from "react-router"
import About from "./components/About"
import Home from "./components/Home"
import AppLayout from "./components/AppLayout"


export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        errorElement: <>main error</>,
        children: [
            {
                path: 'about', element: <About/>,
                children: [
                    { path: 'ruti', element: <>my name is: ruti</> }

                ]
            },
            { path: '/', element: <Home/> },
        ]
    }
])
