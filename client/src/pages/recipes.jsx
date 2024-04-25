import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { getRecipes } from "@/api/recipes"
import { RECIPES } from "@/router/urls"
import { useQuery, useQueryClient } from "react-query"
import { Button } from "@/components/ui/button"
import hero from "/recipes/hero.webp"

function Recipes() {
    const queryClient = useQueryClient()
    const { data, error, isLoading } = useQuery(
        ['recipes'],
        getRecipes,
        {
            refetchOnWindowFocus: false,
            retry: 3,
            refetchInterval: 10 * 60 * 1000
        }
    )

    const displayRecipes = () => {
        return data?.data.map(recipe =>
            <Card key={recipe._id}>
                <CardHeader>
                    <CardTitle className="capitalize">{recipe.title}</CardTitle>
                    <CardDescription>
                        <p className="font-thin">By: {recipe.creator.fullname}</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{recipe.description}</p>
                </CardContent>
                <CardFooter>
                    <Link className="underline" to={RECIPES + recipe._id}>details</Link>
                </CardFooter>
            </Card>
        );
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
                <h3>Something went wrong</h3>
                <p>please refresh the page</p>
                <Button onClick={() => { window.location.reload() }}>refresh</Button>
            </div>
        )
    }

    return (
        <>
            <div class="mb-5 relative bg-cover bg-center h-80" style={{ backgroundImage: `url(${hero})` }}>
                <div class="absolute inset-0 bg-black opacity-60"></div>
                <div class="p-4 w-full absolute inset-0 text-center flex flex-col items-center justify-center">
                    <h3 class="text-primary text-4xl font-semibold">Welcome !</h3>
                    <p class="text-white font-thin">Discover, share, and savor delicious recipes from around the world. Get ready to cook up a storm and delight your taste buds!</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {displayRecipes()}
            </div>
        </>
    );
}

export default Recipes;