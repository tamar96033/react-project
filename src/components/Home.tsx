import { Outlet } from "react-router-dom"

const Home = () => {
    return (<>
        <div>
            home component
        </div>
        <Outlet/>
    </>)
}

export default Home