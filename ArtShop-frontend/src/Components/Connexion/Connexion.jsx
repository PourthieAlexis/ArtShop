import {useState} from 'react';
import './Connexion.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
function Connexion() {
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
    <div className="Connexion">
      <header className="Connexion-header">
        <h3>Connexion</h3>
        <h4>Lorem Ipsum</h4>
      </header>

      <main>
        <form className="connexionForm" onSubmit={formik.handleSubmit}>
            <p>Mail* </p>
          <StyledInput
            label="Mail"
            type={"email"}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            
          />
          <p>Mot de passe * </p>
          <StyledInput
            label="Mot de passe"
            type={"password"}
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            
          />
          <br/>
          <button className="b1" disabled={loading} type={"submit"}>
            {loading ? "Loading..." : "Se connecter"}
          </button>
          <br/>
          <button className="b2" disabled={loading} type={"submit"}>
            {loading ? "Loading..." : "Se connecter avec Google"}
          </button>
        </form>
      </main>
    </div>
  );
}
const StyledInput = styled.input`
    width : 300px;
    margin-bottom: 10px;
`;
export default Connexion;