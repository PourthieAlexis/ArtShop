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
    <div className="connexion">
        <div className="menu-header">
            <tr><image><b>Logo</b></image></tr>
            <tr className="menu-bouton-container">
                <button className="menu-bouton signup">Sign Up</button>
                <button className="menu-bouton login">Login</button>
            </tr> 
        </div>
        
        <div className="connexion-header">
            <h2>Connexion</h2>
            <p className='para-header'>Lorem Ipsum</p>
        </div>
        
      <section>
        <form className="connexionForm" onSubmit={formik.handleSubmit}>
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
          
          <br/>
          <button className="b1" disabled={loading} type={"submit"}>
            {loading ? "Loading..." : "Se connecter"}
          </button>
          <br/>
          <button className="b2" disabled={loading} type={"submit"}>
            <div className='bcontent'>
            <img className="logoGoogle" src="./src/assets/G_icon_16_16.png"></img>
            {loading ? "Loading..." : " Se connecter avec Google"}
            </div>
          </button>
        </form>
      </section>
    </div>
  );
}
const StyledInput = styled.input`
    width : 31rem;
    height : 2.5rem;
`;
export default Connexion;