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
import { useNavigate } from "react-router-dom";
import { RECIPES } from "@/router/urls";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

function Login() {
    const navigate = useNavigate()
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const { formState, handleSubmit, control, reset } = form;
    const { isSubmitting, isValid } = formState;

    const submit = async (data) => {

    }

    return (
        <>
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

export default Login;