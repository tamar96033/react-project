import {  useEffect, useState } from "react";
import ChosenRecipe from "./ChosenRecipe";
import RecipeStore, { recipeType } from "../stores/RecipeStore";
import { observer } from "mobx-react-lite";


const style: React.CSSProperties  = { 
    width: '50vw',
    height: '50vh',
    backgroundColor: 'lightblue',
    border: '1px solid black',
    overflowY: 'auto'
}

const RecipeList = observer(() => {

    const [selectedRecipe, setSelectedRecipe] = useState<recipeType | null>(null);

    useEffect(() => {
        RecipeStore.fetchRecipes().catch(error => console.error('Error fetching recipes:', error.message));
    }, []);
    

    function handleRecipeClick(recipe: recipeType) {
        setSelectedRecipe(recipe);
    }

    return (<>
        <div style={style}>
            {selectedRecipe && <ChosenRecipe recipe={selectedRecipe} />}
        </div>

        <div style={style}>
            <div>Recipes List</div>
            <ul>
                {RecipeStore.list.map((r, i)=>(
                    <li key={i}>
                        <button onClick={()=>handleRecipeClick(r)}>
                            {r.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </>);
});

export default RecipeList;