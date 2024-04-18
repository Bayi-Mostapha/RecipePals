import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState([])

    const getRecipe = async () => {
        const res = await axios.get('http://localhost:5000/recipes/' + id)
        setRecipe(res.data)
    }
    useEffect(() => {
        getRecipe()
    }, [])
    return (
        <div>
            <h2 className="font-bold text-xl capitalize">{recipe.title}</h2>
            <p>
                {recipe.description}
            </p>
            <h4 className="font-semibold text-lg">Ingredients :</h4>
            <ul>
                {recipe.ingredients.map((ingredient, i) =>
                    <li key={recipe._id + i} className="text-sm">
                        {ingredient}
                    </li>
                )}
            </ul>
            <h4 className="font-semibold text-lg">Instructions :</h4>
            <p className="text-sm">{recipe.instructions}</p>
        </div>
    );
}

export default Recipe;