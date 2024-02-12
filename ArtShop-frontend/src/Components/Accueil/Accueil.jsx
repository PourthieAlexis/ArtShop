import './Accueil.css';
import {useEffect, useState} from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { listArt } from "../../api/backend/art";
import axios from "axios";

let loadcheck = true;
let arrayArt = [];
const regEx = /\$|\,|\;|\.|\+|\ /g ;

const Accueil = () =>
{
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInit, setSearch] = useState([]);
  const validateSchema = Yup.object().shape({search: Yup.string()});
  
  const formik = useFormik({
      initialValues: {
        search: "",
        filter: "",
      },
      validationSchema: validateSchema,
      
      onSubmit: (values, { resetForm }) => {
        
        console.log(formik.handleChange);
        setLoading(true);
        setSearch(formik.values.search.split(regEx));
        console.log(searchInit);
        setTimeout(() => {
          setLoading(false);
          resetForm();
        }, 2000);
      },
    });
  
  useEffect( () => {
    
      listArt()
      .then(response => {
        
        setArt(response.data);
      })
      .catch(err => {
        console.error(err.data);
      })
  },[])
  
  while(loadcheck === true && art[0] !== undefined){
    art.forEach(piece => {arrayArt.push([piece.image,piece.title,piece.description,piece.price]);});
    loadcheck = false;
  }

  return(
    <>
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
                {
                  searchInit.length !== 0 ? (
                    searchInit.map(elem => (<p className='tag'>{elem}</p>))):(null)
                }
                
              </div>
              <h1 className='titreListe'>Product List</h1>
            </ul>
            <div className='resultOutputzone'>
              <ul className='commentaireproduit'>
                <p>lorem ipsum dolore ym das arhtung</p>  
                <ul className='nombreproduit'>
                  <p>montre actuellement {arrayArt.length} produits sur {art.length}</p> <button>Voir tout</button>
                </ul>
              </ul>
              <li className='ligneProduit'>
                {arrayArt.map((item, i) => 
                (
                  <ul className='produit' key={i}>
                    <img className="imageProduit" src={item[0]} alt="Produit" />
                    <h4 className="nomProduit">{item[1]}</h4>
                    <p className="detailProduit">{item[2]}</p>
                    <h3 className="prixProduit">{item[3]}$</h3>
                  </ul>
                ))}
              </li>
            </div>
          </div>
        </section>
      </div>
    </>
    )
}
const StyledInput = styled.input`
width : 31rem;
height : 2.5rem;
`;
export default Accueil;
 