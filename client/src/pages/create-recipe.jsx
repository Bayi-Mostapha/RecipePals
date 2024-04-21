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
import { createRecipe } from "@/api/recipes";
import { useNavigate } from "react-router-dom";
import { RECIPES } from "@/router/urls";
import { useMutation, useQueryClient } from "react-query";

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    ingredients: yup.string().required(),
    instructions: yup.string(),
});

function CreateRecipe() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            ingredients: '',
            instructions: '',
        }
    });
    const { formState, handleSubmit, control, reset } = form;
    const { isSubmitting, isValid } = formState;

    const recipeCreateMutation = useMutation(variables => {
        return createRecipe(variables.data)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['recipes'])
            toast.success('recipe created successfully')
            reset()
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
        recipeCreateMutation.mutate({ data })
    }

    return (
        <>
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
                    <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                </form>
            </Form>
        </>
    );
}

export default CreateRecipe;