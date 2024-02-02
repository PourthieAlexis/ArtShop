import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import UserInitialValues from "../formik/initialValues/UserInitialValues";
import LoginYup from "../formik/yup/SignUpYup";
import { register } from "../../api/backend/account";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [errorLog, setErrorLog] = useState(false);


    const formik = useFormik({
        initialValues: UserInitialValues,
        validationSchema: LoginYup,
        onSubmit: (values) => {
            register(values)
                .then((res) => {
                    if (res.status === 201) {
                        console.log("Inscription réussie", res.data);
                    }
                })
                .catch((e) => console.log(e));
        },
    });

    return (
        <>
            <TitleContainer>
                <Title>Sign Up</Title>
                <Text>Lorem ipsum dolor sit amet</Text>
            </TitleContainer>
            <Form onSubmit={formik.handleSubmit}>
                <p className='form-p'>Name* </p>
                <StyledInput
                    label="Name"
                    type={"text"}
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p className='form-p'>Mail* </p>
                <StyledInput
                    label="Mail"
                    type={"email"}
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p className='form-p'>Mot de passe* </p>
                <StyledInput
                    label="Mot de passe"
                    type={"password"}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}

                />

                <Button disabled={loading} type={"submit"} value="Se connecter" />
                <ButtonGoogle disabled={loading} type={"submit"}>
                    <img src="./src/assets/googleIcon.png" />
                    Se connecter avec Google
                </ButtonGoogle>
            </Form>
        </>
    )
}


const TitleContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  font-size: large;
`

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin: 2rem;
`

const Text = styled.p`
  margin: 0;
`

const StyledInput = styled.input`
    width : 100%;
    height : 2.5rem;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Button = styled.input`
    background-color: #000000;
    color: white;
    height: 3rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    cursor: pointer;
`

const ButtonGoogle = styled.button`
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export default SignUp