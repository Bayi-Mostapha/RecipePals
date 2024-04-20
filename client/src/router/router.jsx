import { createBrowserRouter } from "react-router-dom";
import Recipes from "../pages/recipes";
import Recipe from "../pages/recipe";
import CreateRecipe from "../pages/create-recipe";
import UpdateRecipe from "../pages/update-recipe";
import { CREATE_RECIPE, RECIPES, UPDATE_RECIPE } from "./urls";

export const router = createBrowserRouter([
    {
        path: RECIPES,
        element: <Recipes />
    },
    {
        path: RECIPES + ':id',
        element: <Recipe />
    },
    {
        path: CREATE_RECIPE,
        element: <CreateRecipe />
    },
    {
        path: UPDATE_RECIPE + ':id',
        element: <UpdateRecipe />
    },
    {
        path: '*',
        element: <div>404</div>
    }
])