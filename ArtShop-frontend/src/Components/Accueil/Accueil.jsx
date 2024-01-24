import './Accueil.css';
import {useState} from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';

function Accueil()
{
    const [loading, setLoading] = useState(false);
    const validateSchema = Yup.object().shape({search: Yup.string()});
    const formik = useFormik({
        initialValues: {
          search: "",
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
        <div className="accueil">
          <section>
            <div className='searchDiv'>
                <form className="connexionForm" onSubmit={formik.handleSubmit}>
                    <StyledInput
                        label="Search"
                        type={"string"}
                        name="Search"
                        onChange={formik.handleChange}
                        value={formik.values.search}
                    />
                    <button className="searchFilter" disabled={loading} type={"submit"}>Filters</button>
                    <button className="searchSubmit" disabled={loading} type={"submit"}>Search</button>
                </form>
            </div>
          </section>
        </div>
      );
    }
const StyledInput = styled.input`
width : 31rem;
height : 2.5rem;
`;
export default Accueil;
