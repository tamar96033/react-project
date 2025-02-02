import { useContext } from "react";
import { Link } from "react-router"
import { UserContext, UserContextType } from "./UserProvider";


const style: React.CSSProperties = {
    position: 'absolute',
    top: '2%',
    right: '2%',
};

const NavBar = () => {

    const {user} =  useContext<UserContextType | undefined>(UserContext) || { user: null, userDispatch: () => { } };

    return (<>
        <nav style={style}>
            <Link to='/'>Home</Link> |
            <Link to='/about'>About</Link> |
            <Link to='/recipes'>Showing Recipes</Link> |
            {user?.id && <Link to='/add-recipe'>Add Recipe</Link>}
        </nav>
    </>)
}

export default NavBar