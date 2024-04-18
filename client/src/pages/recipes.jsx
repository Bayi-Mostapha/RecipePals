import axios from "axios"
import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

function Recipes() {
    const [recipes, setRecipes] = useState([])

    const getRecipes = async () => {
        const res = await axios.get('http://localhost:5000/recipes')
        setRecipes(res.data)
    }
    useEffect(() => {
        getRecipes()
    }, [])

    const displayRecipes = () => {
        return recipes.map(recipe =>
            <Card>
                <CardHeader>
                    <CardTitle className="capitalize">{recipe.title}</CardTitle>
                    <CardDescription>
                        {recipe.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Link to={'/recipes/' + recipe._id}>details</Link>
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