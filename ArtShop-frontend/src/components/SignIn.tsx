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

const SignUp: React.FC = () => {
    const [errorLog, setErrorLog] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { mutate } = useMutation({ mutationFn: authenticate });
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: UserInitialValues,
        validationSchema: LoginYup,
        onSubmit: async (values) => {
            mutate(values, {
                onSuccess(data) {
                    dispatch(signIn(data.data.token));
                    console.log(data.data.token);
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
                <p className='form-p'>Mail* </p>
                <StyledInput
                    type={"email"}
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && <ErrorText>{formik.errors.email}</ErrorText>}

                <p className='form-p'>Mot de passe* </p>
                <StyledInput
                    type={"password"}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && <ErrorText>{formik.errors.password}</ErrorText>}

                <Button type={"submit"} value="Se connecter" />
                <ButtonGoogle type={"submit"}>
                    <img className="logoGoogle" src="./src/assets/googleIcon.png" alt="Google Icon" />
                    Se connecter avec Google
                </ButtonGoogle>
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
`;

const Button = styled.input`
    background-color: #000000;
    color: white;
    height: 3rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    cursor: pointer;
`;

const ButtonGoogle = styled.button`
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export default SignUp;
