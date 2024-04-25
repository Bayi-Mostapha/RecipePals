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
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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

    const [searchQuery, setSearchQuery] = useState('');
    const filteredRecipes = searchQuery === '' ? data?.data : data?.data.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatch || descriptionMatch;
    });
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const displayRecipes = () => {
        if (filteredRecipes.length <= 0) {
            return <div className="h-72 flex justify-center items-center">
                <p className="w-fit">
                    no recipes found!
                </p>
            </div>
        }
        return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {
                filteredRecipes.map(recipe =>
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
                    </Card>)
            }
        </div>
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
            <h3 class="mb-1 text-primary text-3xl font-semibold">Recipes</h3>
            <div className="relative mx-auto w-[80%]">
                <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" size={19} />
                <Input
                    className="pl-8 mb-3 shadow-sm"
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            {displayRecipes()}
        </>
    );
}

export default Recipes;