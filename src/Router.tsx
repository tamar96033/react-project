import { createBrowserRouter } from "react-router"
import About from "./components/About"
import Home from "./components/Home"
import AppLayout from "./components/AppLayout"
import Recipes from "./components/Recipes"
import AddRecipe from "./components/AddRecipe"
import ProtectedRoute from "./components/ProtectedRoute"


export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        errorElement: <>main error</>,
        children: [
            {
                path: 'about', element: <About/>,
            },
            {
                path: 'recipes', element: <Recipes/>,
            },
            {
                path: 'add-recipe', element:<ProtectedRoute><AddRecipe/></ProtectedRoute>,
            },
            { path: '/', element: <Home/> },
        ]
    }
])
