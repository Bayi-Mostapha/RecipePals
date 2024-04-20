import { useEffect, useState } from "react"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { getRecipes } from "@/api/recipes"
import { RECIPES } from "@/router/urls"

function Recipes() {
    const [recipes, setRecipes] = useState([])

    const fetchRecipes = async () => {
        const res = await getRecipes()
        setRecipes(res.data)
    }
    useEffect(() => {
        fetchRecipes()
    }, [])

    const displayRecipes = () => {
        return recipes.map(recipe =>
            <Card key={recipe._id}>
                <CardHeader>
                    <CardTitle className="capitalize">{recipe.title}</CardTitle>
                    <CardDescription>
                        {recipe.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Link to={RECIPES + recipe._id}>details</Link>
                </CardFooter>
            </Card>
        );
    }
    return (
        <div className="grid grid-cols-4 gap-2">
            {displayRecipes()}
        </div>
    );
}

export default Recipes;