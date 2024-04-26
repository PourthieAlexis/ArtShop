import React from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import LoginYup from "../../formik/yup/SignInYup";
import UserInitialValues from "../../formik/initialValues/UserInitialValues";
import { authenticate } from "../../api/backend/account";
import { useDispatch } from "react-redux";
import { signIn } from "../../reducers/authenticationSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "../../constants/urls/urlFrontend";
import PrimaryInput from "../shared/PrimaryInput";
import SecondaryInput from "../shared/SecondaryInput";

const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const { mutate, isPending, isError } = useMutation({ mutationFn: authenticate });
    const navigate = useNavigate();


    return (
        <>
            <TitleContainer>
                <Title>Sign In</Title>
                <Text>Lorem, ipsum dolor sit</Text>
            </TitleContainer>
            {isError && <ErrorText>Les identifiants sont incorrects</ErrorText>}
            <Formik
                initialValues={UserInitialValues}
                validationSchema={LoginYup}
                onSubmit={(values) => {
                    mutate(values, {
                        onSuccess(data) {
                            dispatch(signIn(data.data.token));
                            navigate(URL_HOME)
                        },
                    })
                }}
            >
                <StyledForm>
                    <label className='form-p'>Mail* </label>
                    <Field
                        as={StyledInput}
                        type="text"
                        name="email"
                    />
                    <ErrorMessage name="email" component={ErrorText} />

                    <label className='form-p'>Mot de passe* </label>
                    <Field
                        as={StyledInput}
                        type="password"
                        name="password"
                    />
                    <ErrorMessage name="password" component={ErrorText} />

                    <PrimaryInput type='submit' value="Se connecter" isLoading={isPending} />
                    <SecondaryInput type="submit" value="Se connecter avec Google" />
                </StyledForm>
            </Formik>
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

const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap:1rem;
    p{
        margin: 0;
    }
`;

export default SignUp;
