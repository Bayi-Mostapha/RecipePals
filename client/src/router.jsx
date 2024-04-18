import { createBrowserRouter } from "react-router-dom";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";

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
        path: '*',
        element: <div>404</div>
    }
])