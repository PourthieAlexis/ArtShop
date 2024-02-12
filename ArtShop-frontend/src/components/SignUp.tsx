import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import UserInitialValues from "../formik/initialValues/UserInitialValues";
import RegisterYup from "../formik/yup/SignUpYup";
import { register } from "../api/backend/account";

const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [errorLog, setErrorLog] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: UserInitialValues,
        validationSchema: RegisterYup,
        onSubmit: (values) => {
            setLoading(true);
            register(values)
                .then((res) => {
                    if (res.status === 201) {
                        console.log("Inscription réussie", res.data);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.response) {
                        setErrorLog(error.response.data.message);
                    } else if (error.request) {
                        setErrorLog("Pas de réponse du serveur. Veuillez réessayer.");
                    } else {
                        setErrorLog("Une erreur s'est produite. Veuillez réessayer.");
                    }
                });
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
                <p className='form-p'>Name* </p>
                <StyledInput
                    type={"text"}
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && <ErrorText>{formik.errors.name}</ErrorText>}

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

                <Button disabled={loading} type={"submit"} value="Se connecter" />
                <ButtonGoogle disabled={loading} type={"submit"}>
                    <img src="./src/assets/googleIcon.png" alt="Google Icon" />
                    Se connecter avec Google
                </ButtonGoogle>
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
