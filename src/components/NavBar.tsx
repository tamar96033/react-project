import { Link } from "react-router"


const style = {
    position: 'absolute',
    top: '2%',
    right: '2%',
    //transform: 'translate(-50%, -50%)',
};

const NavBar = () => {

    return (<>
        <nav style={style}>
            <Link to='/'>Home</Link> | <Link to='/about'>About</Link> 
        </nav>
    </>)
}

export default NavBar