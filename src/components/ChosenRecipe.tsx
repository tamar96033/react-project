import { recipeType } from "../stores/RecipeStore";

const ChosenRecipe = ({ recipe }: { recipe: recipeType }) => {

    if (!recipe) {
        return <div>No recipe selected</div>;
    }

    return (<>
        <div>{recipe?.title}</div>
        <div>{recipe?.description}</div>
        <ul>
            {recipe?.ingredients?.map(ing =>
                <li key={ing}>
                    {ing}
                </li>)}
        </ul>
        <div>instructions: {recipe.instructions}</div>
    </>)
}

export default ChosenRecipe