import { deleteRecipe, getRecipe } from "@/api/recipes";
import { Button } from "@/components/ui/button";
import { authContext } from "@/contexts/auth-wrapper";
import { RECIPES, UPDATE_RECIPE } from "@/router/urls";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function Recipe() {
    const { id } = useParams()
    const { user } = useContext(authContext)
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
                {
                    user && recipe.creator._id == user._id &&
                    <div className="flex items-center justify-end gap-3">
                        <Link className="px-4 py-2 border rounded-md shadow-sm hover:bg-primary-foreground transition-all" to={UPDATE_RECIPE + id}>Edit</Link>
                        <Dialog>
                            <DialogTrigger
                                className="px-4 py-2 bg-destructive text-white rounded-md hover:opacity-90 transition-all"
                            >
                                Delete
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete this recipe
                                    </DialogDescription>
                                    <Button variant='destructive' onClick={() => { removeRecipe(recipe._id) }}>Delete</Button>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                }
                <h2 className="font-semibold text-2xl capitalize">{recipe.title}</h2>
                <h2 className="text-xs text-gray-500">
                    By: {recipe.creator.fullname}
                </h2>
                <p className="mt-1">
                    {recipe.description}
                </p>
                <h4 className="font-medium text-lg mt-5">Ingredients :</h4>
                <ul className="mb-5">
                    {recipe.ingredients.map((ingredient, i) =>
                        <li key={recipe._id + i} className="text-sm">
                            {ingredient}
                        </li>
                    )}
                </ul>
                <h4 className="font-medium text-lg">Instructions :</h4>
                <p className="text-sm">{recipe.instructions}</p>
            </div>
        </>
    );
}

export default Recipe;