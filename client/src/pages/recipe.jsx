import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const navigate = useNavigate()

    const getRecipe = async () => {
        try {
            setIsFetching(true)
            const res = await axios.get('http://localhost:5000/recipes/' + id)
            setRecipe(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsFetching(false)
        }
    }
    useEffect(() => {
        getRecipe()
    }, [])

    const deleteRecipe = async (id) => {
        try {
            const res = await axios.delete('http://localhost:5000/recipes/' + id)
            toast.success(res.data.message)
            navigate('/recipes')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {
                recipe ?
                    <div>
                        <Button variant='destructive' onClick={() => { deleteRecipe(recipe._id) }}>delete</Button>
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
                    :
                    isFetching ?
                        <div>loading...</div>
                        :
                        <div>recipe not found</div>
            }
        </>
    );
}

export default Recipe;