import { deleteRecipe, getRecipe } from "@/api/recipes";
import { Button } from "@/components/ui/button";
import { RECIPES, UPDATE_RECIPE } from "@/router/urls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function Recipe() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data, error, isLoading } = useQuery(
        ['recipe', id],
        () => getRecipe(id),
        {
            refetchOnWindowFocus: false,
            retry: 3,
            refetchInterval: 10 * 60 * 1000,
            initialData: () => {
                const recipes = queryClient.getQueryData(['recipes'])?.data;
                if (recipes) {
                    return { data: recipes?.find(recipe => recipe._id == id) }
                }
                return undefined
            }
        }
    )

    const recipeDeleteMutation = useMutation(variables => {
        return deleteRecipe(variables.id)
    },
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['recipes'])
                queryClient.removeQueries(['recipe', variables.id])
                toast.success('recipe deleted successfully')
                navigate(RECIPES)
            },
            onError: (error, variables, context) => {
                console.error(error)
                toast.error(error.response.data.message)
            }
        })
    const removeRecipe = async (id) => {
        try {
            recipeDeleteMutation.mutate({ id: id })
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {
                    error.response.status == 404 ?
                        <h3>Recipe not found</h3>
                        :
                        <h3>Something went wrong</h3>
                }

                <Button onClick={() => { navigate(RECIPES) }}>go home</Button>
            </div>
        )
    }
    const recipe = data.data

    return (
        <>
            <div>
                <Button variant='destructive' onClick={() => { removeRecipe(recipe._id) }}>delete</Button>
                <Link to={UPDATE_RECIPE + id}>update</Link>
                <h2 className="font-bold text-xl capitalize">{recipe.title}</h2>
                <p>
                    {recipe.creator.fullname}
                </p>
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
        </>
    );
}

export default Recipe;