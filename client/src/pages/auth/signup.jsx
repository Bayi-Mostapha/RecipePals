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
import { LOGIN, RECIPES } from "@/router/urls";
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
        <div className="w-[90%] sm:w-96">
            <h1 className="text-center text-primary text-3xl font-semibold">RecipePals</h1>
            <p className="text-center text-sm font-thin">Create an account and join our platform now!</p>
            <Form {...form}>
                <form className="mt-5" onSubmit={handleSubmit(submit)}>
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
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="mt-2 text-sm">already have an account? <Link className="text-primary" to={LOGIN}>login</Link></p>
                    <Button className="mt-5 ml-auto block" disabled={!isValid || isSubmitting} type="submit">Sign up</Button>
                </form>
            </Form>
        </div>
    );
}

export default Signup;