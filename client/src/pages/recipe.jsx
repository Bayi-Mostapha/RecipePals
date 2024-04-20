import { deleteRecipe, getRecipe } from "@/api/recipes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const navigate = useNavigate()

    const fetchRecipe = async () => {
        try {
            setIsFetching(true)
            const res = await getRecipe(id)
            setRecipe(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsFetching(false)
        }
    }
    useEffect(() => {
        fetchRecipe()
    }, [])

    const removeRecipe = async (id) => {
        try {
            const res = await deleteRecipe(id)
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
                        <Button variant='destructive' onClick={() => { removeRecipe(recipe._id) }}>delete</Button>
                        <Link to={'/update-recipe/' + id}>update</Link>
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