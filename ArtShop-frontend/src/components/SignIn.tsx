import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import LoginYup from "../formik/yup/SignInYup";
import UserInitialValues from "../formik/initialValues/UserInitialValues";
import { authenticate } from "../api/backend/account";
import { useDispatch } from "react-redux";
import { signIn } from "../reducers/authenticationSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "../constants/urls/urlFrontend";
import PrimaryInput from "./PrimaryInput";
import SecondaryInput from "./SecondaryInput";

const SignUp: React.FC = () => {
    const [errorLog, setErrorLog] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { mutate, isPending } = useMutation({ mutationFn: authenticate });
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: UserInitialValues,
        validationSchema: LoginYup,
        onSubmit: async (values) => {
            mutate(values, {
                onSuccess(data) {
                    dispatch(signIn(data.data.token));
                    navigate(URL_HOME)
                },
                onError(error) {
                    setErrorLog(error.message);
                },
            })
        }
    });

    return (
        <>
            <TitleContainer>
                <Title>Sign In</Title>
                <Text>Lorem, ipsum dolor sit</Text>
            </TitleContainer>
            {errorLog && <ErrorText>{errorLog}</ErrorText>}
            <Form onSubmit={formik.handleSubmit}>
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

                <PrimaryInput type='submit' value="Se connecter" isLoading={isPending} />
                <SecondaryInput type={"submit"} value={"Se connecter avec Google"} />
            </Form>
        </>
    );
};

const ErrorText = styled.p`
    color: red;
    margin-top: 1rem;
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
    gap:1rem;
    p{
        margin: 0;
    }
`;

export default SignUp;
