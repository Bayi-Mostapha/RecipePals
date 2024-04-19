import { createBrowserRouter } from "react-router-dom";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import CreateRecipe from "./pages/create-recipe";
import UpdateRecipe from "./pages/update-recipe";

export const router = createBrowserRouter([
    {
        path: '/recipes',
        element: <Recipes />
    },
    {
        path: '/recipes/:id',
        element: <Recipe />
    },
    {
        path: '/create-recipe/',
        element: <CreateRecipe />
    },
    {
        path: '/update-recipe/:id',
        element: <UpdateRecipe />
    },
    {
        path: '*',
        element: <div>404</div>
    }
])