import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import UserInitialValues from "../../formik/initialValues/UserInitialValues";
import RegisterYup from "../../formik/yup/SignUpYup";
import { register } from "../../api/backend/account";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../../constants/urls/urlFrontend";
import PrimaryInput from "../shared/PrimaryInput";
import SecondaryInput from "../shared/SecondaryInput";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
    const { mutate, isPending, } = useMutation({ mutationFn: register });
    const navigate = useNavigate()
    const [errorLog, setErrorLog] = useState<Array<string> | null>(null);

    return (
        <>
            <TitleContainer>
                <Title>Sign Up</Title>
                <Text>Lorem ipsum dolor sit amet</Text>
            </TitleContainer>
            {errorLog && errorLog.map((error) => <ErrorText>{error}</ErrorText>)}
            <Formik
                initialValues={UserInitialValues}
                validationSchema={RegisterYup}
                onSubmit={(values) => {
                    mutate(values, {
                        onSuccess() {
                            navigate(URL_LOGIN)
                            toast.success("Votre inscription est réussi ! \n Maintenant vous devez vous connecter", {
                                position: "bottom-right"
                            });
                        },
                        onError(error: any) {
                            const errorMessage = JSON.parse(error.response.data.detail);
                            setErrorLog(errorMessage);
                        },
                    })
                }}
            >
                <StyledForm>
                    <GroupForm>
                        <GroupInput>
                            <label className='form-p'>Name* </label>
                            <Field
                                as={StyledInput}
                                type="text"
                                name="name"
                            />
                            <ErrorMessage name="name" component={ErrorText} />
                        </GroupInput>
                        <GroupInput>
                            <label className='form-p'>Artist Name* </label>
                            <Field
                                as={StyledInput}
                                type="text"
                                name="artistName"
                            />
                            <ErrorMessage name="artistName" component={ErrorText} />
                        </GroupInput>
                    </GroupForm>
                    <label className='form-p'>Mail* </label>
                    <Field
                        as={StyledInput}
                        type="email"
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
                    <label className='form-p'>Phone* </label>
                    <Field
                        as={StyledInput}
                        type="tel"
                        name="phone"
                    />
                    <ErrorMessage name="phone" component={ErrorText} />
                    <label className='form-p'>Address* </label>
                    <Field
                        as={StyledInput}
                        type="text"
                        name="address"
                    />
                    <ErrorMessage name="address" component={ErrorText} />
                    <PrimaryInput type='submit' value="S'inscrire" isLoading={isPending} />
                    <SecondaryInput type="submit" value="Se connecter avec Google" />
                </StyledForm>
            </Formik >
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

const GroupForm = styled.div`
    display: flex;
    gap: 1rem;
`;

const GroupInput = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    p{
        margin: 0;
}
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
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    p{
        margin: 0;
}
`;


export default SignUp;
