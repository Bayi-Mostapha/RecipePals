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
import { Navigate, useNavigate } from "react-router-dom";
import { RECIPES } from "@/router/urls";
import axiosClient from "@/api/axios";
import { authContext } from "@/contexts/auth-wrapper";
import { useContext } from "react";

const schema = yup.object().shape({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

function Signup() {
    const { user } = useContext(authContext)
    const navigate = useNavigate()
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
        }
    });
    const { formState, handleSubmit, control } = form;
    const { isSubmitting, isValid } = formState;

    const submit = async (data) => {
        try {
            const res = await axiosClient.post('/user/signup', data)
            toast.success(res.data.message)
            navigate(RECIPES)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

    if (user) {
        return <Navigate to={RECIPES} />
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit(submit)}>
                    <FormField
                        control={control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={!isValid || isSubmitting} type="submit">Signup</Button>
                </form>
            </Form>
        </>
    );
}

export default Signup;