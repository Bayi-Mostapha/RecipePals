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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RECIPES, SIGNUP } from "@/router/urls";
import axiosClient from "@/api/axios";
import { useContext } from "react";
import { authContext } from "@/contexts/auth-wrapper";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

function Login() {
    const { setUser, user } = useContext(authContext)
    const navigate = useNavigate()
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const { formState, handleSubmit, control } = form;
    const { isSubmitting, isValid } = formState;

    const submit = async (data) => {
        try {
            const res = await axiosClient.post('/user/login', data)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setUser(res.data.user)
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
        <div className="w-[90%] sm:w-96">
            <h1 className="text-center text-primary text-3xl font-semibold">RecipePals</h1>
            <p className="text-center text-sm font-thin">welcome back, we missed you!</p>
            <Form {...form}>
                <form onSubmit={handleSubmit(submit)}>
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
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="mt-2 text-sm">don't have an account? <Link className="text-primary" to={SIGNUP}>sign up</Link></p>
                    <Button className="mt-5 ml-auto block" disabled={!isValid || isSubmitting} type="submit">Login</Button>
                </form>
            </Form>
        </div>
    );
}

export default Login;