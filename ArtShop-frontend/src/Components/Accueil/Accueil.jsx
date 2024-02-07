import './Accueil.css';
import {useEffect, useState} from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { listArt } from "../../api/backend/art";
function Accueil()
{
  useEffect(() => {
    listArt()
                .then((res) => {
                  console.log(res.data);
                })
                .catch((error) => {
                    console.log(error.data)
    })
  });
    const [art, loadArt] = useState(false);
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
          console.log(formik.handleChange);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            resetForm();
          }, 2000);
        },
      });
    
      return (
        <div className="accueil">
          <section className='section1'>
            <div className='searchDiv'>
                <form className="connexionForm" onSubmit={formik.handleSubmit}>
                  <div>
                    <StyledInput
                      className='searchbar'
                      label="Search"
                      type="text"
                      name="search"
                      
                      onChange={formik.handleChange}
                      value={formik.values.search}
                    />
                  </div>
                  <div className='searchButton'>
                    <button className="searchFilter" disabled={loading} type={"submit"}>Filters</button>
                    <select className="searchOrder" disabled={loading} type={"submit"}> 
                      <option>Sort By</option>
                      <option>Date</option>
                      <option>Name</option>
                      <option>Genre</option>
                      <option>Type</option>
                    </select>
                  </div>
                </form>
            </div>
          </section>

          <section className='section2'>
            
            <div className='resultList'>
              
              <ul>
                <div className='tagList'>
                  <p>tag</p><p>tag</p><p>tag</p>
                </div>
                <h1 className='titreListe'>Product List</h1>
              </ul>
              
              <div className='resultOutputzone'>
              <ul className='commentaireproduit'>
                <p>lorem ipsum dolore ym das arhtung</p>  
                <ul className='nombreproduit'>
                  <p>montre actuellement 0 produits sur 100</p> <button>Voir tout</button>
                </ul>
              </ul>
                <li className='ligneProduit'>
                  <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'></h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                </li>
                <li className='ligneProduit'>
                  <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                <ul className='produit'>
                  <img className="imageProduit" src="./src/assets/G_icon_16_16.png"></img>
                  <h4 className='nomProduit'>NomProduit</h4>
                  <p className='detailProduit'>Lorem Ipsum</p>
                  <h3 className='prixProduit'>50$</h3>
                </ul>
                </li>
              </div>
            </div>
          </section>

          <footer>
            <div className="general-footer">
              
              <li className="footer-container">
                <ul>
                  <img className='logo' src="./src/assets/logo.png"></img>
                </ul>
              
              <ul>
                  <button className="footer-bouton fb1"><b>bouton 1</b></button>
                  <button className="footer-bouton fb2"><b>bouton 2</b></button>
                  <button className="footer-bouton fb3"><b>bouton 3</b></button>
                  <button className="footer-bouton fb4"><b>bouton 4</b></button>
                  <button className="footer-bouton fb5"><b>bouton 5</b></button>
              </ul>
              
              <ul>
                  <button className="footer-bouton social fb1"><img className='imageSocial' src='./src/assets/facebook.png'></img></button>
                  <button className="footer-bouton social fb2"><img className='imageSocial' src='./src/assets/insta.png'></img></button>
                  <button className="footer-bouton social fb3"><img className='imageSocial' src='./src/assets/logoX.png'></img></button>
                  <button className="footer-bouton social fb4"><img className='imageSocial' src='./src/assets/linkedin.png'></img></button>
                  <button className="footer-bouton social fb5"><img className='imageSocial' src='./src/assets/youtube.png'></img></button>
              </ul>
              </li>
              <li className='footer-legal'>
                <p>Made in 2024. All rights reserved.</p> <a className="footerlink" href="https://google.fr/">privacy policy</a> <a className="footerlink" href="">terms of service</a> <a className="footerlink" href="">cookies setting</a>
              </li>
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
