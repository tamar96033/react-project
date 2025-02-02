import { makeAutoObservable } from "mobx"

export type recipeType = {
    "id"?: number,
    "title": string,
    "description"?: string,
    "authorId"?: number,
    "ingredients"?: string[],
    "instructions"?: string
}

class RecipeStore {

    list: recipeType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchRecipes() {
        const response = await fetch('http://localhost:3000/api/recipes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        this.list = data;
    };

    async addRecipe(recipe: recipeType, userId: number){
        const response = await fetch('http://localhost:3000/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': userId.toString()
            },
            body: JSON.stringify({...recipe}),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }
}

export default new RecipeStore()