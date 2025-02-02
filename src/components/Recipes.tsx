import { Outlet } from "react-router-dom"
import RecipeList from "./RecipeList"

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const Recipes = () => {

    return (<>
        <Outlet />

        <div style={style}>
            <RecipeList />
        </div>
    </>)
}

export default Recipes
