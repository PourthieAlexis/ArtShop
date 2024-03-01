import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import UserInitialValues from "../formik/initialValues/UserInitialValues";
import RegisterYup from "../formik/yup/SignUpYup";
import { register } from "../api/backend/account";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../constants/urls/urlFrontend";
import PrimaryInput from "./PrimaryInput";
import SecondaryInput from "./SecondaryInput";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
    const [errorLog, setErrorLog] = useState<string | null>(null);
    const { mutate, isPending } = useMutation({ mutationFn: register });
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: UserInitialValues,
        validationSchema: RegisterYup,
        onSubmit: (values) => {
            mutate(values, {
                onSuccess(data) {
                    navigate(URL_LOGIN)
                    toast.success("Votre inscription est réussi ! \n Maintenant vous devez vous connecter", {
                        position: "bottom-right"
                    });
                },
                onError(error) {
                    setErrorLog(error.message);
                },
            })
        },
    });

    return (
        <>
            <TitleContainer>
                <Title>Sign Up</Title>
                <Text>Lorem ipsum dolor sit amet</Text>
            </TitleContainer>
            {errorLog && <ErrorText>{errorLog}</ErrorText>}
            <Form onSubmit={formik.handleSubmit}>
                <label className='form-p'>Name* </label>
                <StyledInput
                    type={"text"}
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && <ErrorText>{formik.errors.name}</ErrorText>}

                <label className='form-p'>Mail* </label>
                <StyledInput
                    type={"email"}
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && <ErrorText>{formik.errors.email}</ErrorText>}

                <label className='form-p'>Mot de passe* </label>
                <StyledInput
                    type={"password"}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && <ErrorText>{formik.errors.password}</ErrorText>}
                <PrimaryInput type='submit' value="S'inscrire" isLoading={isPending} />
                <SecondaryInput type={"submit"} value={"Se connecter avec Google"} />
            </Form>
        </>
    );
};

const ErrorText = styled.p`
    color: red;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: large;
`;

const Title = styled.p`
    font-size: 2rem;
    font-weight: 600;
    margin: 2rem;
`;

const Text = styled.p`
    margin: 0;
`;

const StyledInput = styled.input`
    width: 100%;
    height: 2.5rem;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    p{
        margin: 0;
    }
`;


export default SignUp;
