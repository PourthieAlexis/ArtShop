import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";

const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const validateSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email").required("This field is required"),
        password: Yup.string().required("This field is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                resetForm();
            }, 1000 * 2);
        },
    });


    return (
        <>
            <TitleContainer>
                <Title>Sign In</Title>
                <Text>Lorem, ipsum dolor sit</Text>
            </TitleContainer>
            <Form onSubmit={formik.handleSubmit}>
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
                <Button disabled={loading} type={"submit"} value={loading ? "Loading..." : "Se connecter"} />
                <ButtonGoogle disabled={loading} type={"submit"}>
                    <img className="logoGoogle" src="./src/assets/googleIcon.png"></img>
                    {loading ? "Loading..." : " Se connecter avec Google"}
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