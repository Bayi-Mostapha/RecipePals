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
import { useQuery, useQueryClient } from "react-query"
import { Button } from "@/components/ui/button"

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
                        {recipe.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Link to={RECIPES + recipe._id}>details</Link>
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
        <div className="grid grid-cols-4 gap-2">
            {displayRecipes()}
        </div>
    );
}

export default Recipes;