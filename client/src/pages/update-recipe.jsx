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
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    ingredients: yup.string().required(),
    instructions: yup.string(),
});

function UpdateRecipe() {
    const { id } = useParams()
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            ingredients: '',
            instructions: '',
        }
    });
    const { formState, handleSubmit, control } = form;
    const { isSubmitting, isValid } = formState;

    const getData = async () => {
        const res = await axios.get('http://127.0.0.1:5000/recipes/' + id);
        const data = { ...res.data, ingredients: res.data.ingredients.join(',') }
        form.setValue('title', data.title)
        form.setValue('description', data.description)
        form.setValue('ingredients', data.ingredients)
        form.setValue('instructions', data.instructions)
    }
    useEffect(() => {
        getData()
    }, [])

    const submit = async (data) => {
        let str = data.ingredients;
        let arr = str.split(",").map(item => item.trim());
        data = { ...data, ingredients: arr }
        try {
            await axios.put('http://127.0.0.1:5000/recipes/' + id, data)
            toast.success('recipe updated successfully')
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
                    <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                </form>
            </Form>
        </>
    );
}

export default UpdateRecipe;