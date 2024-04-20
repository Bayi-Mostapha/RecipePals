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

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    ingredients: yup.string().required(),
    instructions: yup.string(),
});

function UpdateRecipe() {
    const { id } = useParams()
    const navigate = useNavigate()
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: async () => {
            const res = await getRecipe(id);
            return { ...res.data, ingredients: res.data.ingredients.join(',') }
        }
    });
    const { formState, handleSubmit, control } = form;
    const { isSubmitting, isDirty } = formState;

    const submit = async (data) => {
        let str = data.ingredients;
        let arr = str.split(",").map(item => item.trim());
        data = { ...data, ingredients: arr }
        try {
            const res = await updateRecipe(id, data)
            toast.success(res.data.message)
            navigate('/recipes')
        } catch (error) {
            console.error(error)
            toast.error('something went wrong')
        }
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
                    <Button disabled={!isDirty || isSubmitting} type="submit">Submit</Button>
                </form>
            </Form >
        </>
    );
}

export default UpdateRecipe;