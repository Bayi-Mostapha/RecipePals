// import { useForm } from "react-hook-form";
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().required(),
// });

function CreateRecipe() {
    // const form = useForm({
    //   resolver: yupResolver(schema),
    // you can make defaultValues a function that returns an object with backend values
    //   defaultValues: {
    //     email: '',
    //     password: '',
    //   }
    // });
    // const { formState, handleSubmit, control } = form;
    // const { isSubmitting, isValid,isDirty } = formState;

    const submit = (data) => {

    }
    return (
        <form onSubmit={handleSubmit(submit)}></form>
    );
}

export default CreateRecipe;