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
          filter: "",
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
          <section className='section1'>
            <div className='searchDiv'>
                <form className="connexionForm" onSubmit={formik.handleSubmit}>
                  <StyledInput
                    label="Search"
                    type={"string"}
                    name="Search"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                  />
                  <br/>
                  <button className="searchFilter" disabled={loading} type={"submit"}>Filters</button>
                </form>
            </div>
          </section>

          <div className='section2'>
            <div className='tagList'>
                  <p>tag</p><p>tag</p><p>tag</p>
            </div>
            <div className='resultList'>
              <td>
                <h2 className='titreListe'>Product List</h2>
              </td>
              <td className='commentaireproduit'>
                <p>lorem ipsum dolore ym das arhtung</p>  
                <td className='nombreproduit'>
                  <p>montre actuellement 0 produits sur 100</p> <button>Voir tout</button>
                </td>
              </td>
              <div className='resultOutputzone'>
                <tr className='ligneProduit'>
                  <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                </tr>
                <tr className='ligneProduit'>
                  <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                <td className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </td>
                </tr>
              </div>

            </div>
          </div>

          <footer>
            <div className="general-header">
              
              <tr className="header-container">
              <image className='logo'><b>Logo</b></image>

              <td>
                  <button className="footer-bouton fb1">bouton 1</button>
                  <button className="footer-bouton fb2">bouton 2</button>
                  <button className="footer-bouton fb3">bouton 3</button>
                  <button className="footer-bouton fb4">bouton 4</button>
                  <button className="footer-bouton fb5">bouton 5</button>
              </td>
              
              <td>
                  <button className="footer-bouton social fb1">a</button>
                  <button className="footer-bouton social fb2">b</button>
                  <button className="footer-bouton social fb3">c</button>
                  <button className="footer-bouton social fb4">d</button>
                  <button className="footer-bouton social fb5">e</button>
              </td>
              </tr>
              <tr className='footer-legal'>
                <p>Made in 2024</p> <a className="footerlink" href="https://google.fr/">privacy policy</a> <a className="footerlink" href="">terms of service</a> <a className="footerlink" href="">cookies setting</a>
              </tr>
            </div>
          </footer>
        </div>
      );
    }
const StyledInput = styled.input`
width : 31rem;
height : 2.5rem;
`;
export default Accueil;
