import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// shadcn 
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe, updateRecipe } from "@/api/recipes";
import { RECIPES } from "@/router/urls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    ingredients: yup.string().required(),
    instructions: yup.string(),
});

function UpdateRecipe() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: recipeQuery, error, isLoading } = useQuery(
        ['recipe', id],
        () => getRecipe(id),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: 3,
            initialData: () => {
                const recipes = queryClient.getQueryData(['recipes'])?.data;
                if (recipes) {
                    const foundRecipe = recipes.find(r => r._id == id);
                    if (foundRecipe)
                        return { data: foundRecipe };
                }

                const recipe = queryClient.getQueryData(['recipe', id])?.data;
                if (recipe)
                    return { data: recipe };

                return undefined;
            },
            onSuccess: (data) => {
                reset({
                    ...data.data,
                    ingredients: data.data.ingredients.join(',')
                })
            }
        }
    );

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...recipeQuery?.data,
            ingredients: recipeQuery?.data?.ingredients?.join(',')
        }
    });
    const { formState, handleSubmit, control, reset } = form;
    const { isSubmitting, isDirty, isValid } = formState;
    const recipeUpdateMutation = useMutation(variables => {
        return updateRecipe(variables.id, variables.data)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['recipes'])
            toast.success('recipe updated successfully')
            navigate(RECIPES)
        },
        onError: (error) => {
            console.error(error)
            toast.error('something went wrong')
        }
    })
    const submit = async (data) => {
        let str = data.ingredients;
        let arr = str.split(",").map(item => item.trim());
        data = { ...data, ingredients: arr }
        recipeUpdateMutation.mutate({ id, data })
    }

    if (isLoading) {
        return (
            <div>
                Loading...
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
    return (
        <>
            {
                recipeQuery?.data &&
                <Form {...form}>
                    <form onSubmit={handleSubmit(submit)}>
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="ingredients"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ingredients</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Write all ingredients comma seperated.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={!isDirty || !isValid || isSubmitting} type="submit">Submit</Button>
                    </form>
                </Form >
            }

        </>
    );
}

export default UpdateRecipe;