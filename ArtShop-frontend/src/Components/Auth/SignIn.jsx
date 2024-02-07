import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import LoginYup from "../formik/yup/SignInYup";
import UserInitialValues from "../formik/initialValues/UserInitialValues";
import { authenticate } from "../../api/backend/account";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../reducers/authenticationSlice";
import { selectUser } from './../../reducers/authenticationSlice';


const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [errorLog, setErrorLog] = useState(false);
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: UserInitialValues,
        validationSchema: LoginYup,
        onSubmit: (values) => {
            authenticate(values)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(signIn(res.data.token));
                        console.log(user);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.response) {
                        setErrorLog(error.response.data.message);
                        console.log(error.response)
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
                <Title>Sign In</Title>
                <Text>Lorem, ipsum dolor sit</Text>
            </TitleContainer>
            <ErrorText>{errorLog}</ErrorText>
            <Form onSubmit={formik.handleSubmit}>
                <p className='form-p'>Mail* </p>
                <StyledInput
                    label="Mail"
                    type={"email"}
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && <ErrorText>{formik.errors.email}</ErrorText>}

                <p className='form-p'>Mot de passe* </p>
                <StyledInput
                    label="Mot de passe"
                    type={"password"}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}

                />
                {formik.touched.password && formik.errors.password && <ErrorText>{formik.errors.password}</ErrorText>}

                <Button disabled={loading} type={"submit"} value={loading ? "Loading..." : "Se connecter"} />
                <ButtonGoogle disabled={loading} type={"submit"}>
                    <img className="logoGoogle" src="./src/assets/googleIcon.png"></img>
                    {loading ? "Loading..." : " Se connecter avec Google"}
                </ButtonGoogle>
            </Form>
        </>
    )
}


const ErrorText = styled.p`
    color: red;
    margin-top: 1rem;
`;

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

    width: 100%;
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