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

  const getInitialState = () => {
    const value = "0";
    return value;
  };

  const [filter, setFilter] = useState(getInitialState);

  const handleChange = (e) => {
    setFilter(e.target.value);
    arrayArt.length = 0;
    loadcheck = true;
    location.reload(document.getElementById('result'));
  };

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
    art.forEach(piece => {arrayArt.push([piece.image,piece.title,piece.description,piece.price, piece.categories_id]);});
    
    console.log(arrayArt)
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
                  <select className="searchOrder" value = {filter} onChange={handleChange}> 
                    <option value = "0">filter By</option>
                    <option value = "1">Painting</option>
                    <option value = "2">Sculpture</option>
                    <option value = "3">Photo</option>
                    <option value = "4">Contemporain</option>
                    <option value = "5">Numérique</option>
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
                  searchInit.map(elem => (<p className='tag'>{elem}</p>))
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
              <li id = "result" className='ligneProduit'>
                {
                /*
                1- peinture {arrayArt.filter(arrayArt => arrayArt.categories_id === 1)}
                2- Sculpture {arrayArt.filter(arrayArt => arrayArt.categories_id === 2)}
                3- Photo {arrayArt.filter(arrayArt => arrayArt.categories_id === 3)}
                4- Contemporain {arrayArt.filter(arrayArt => arrayArt.categories_id === 4)}
                5- Numérique {arrayArt.filter(arrayArt => arrayArt.categories_id === 5)}
                */
                arrayArt.map((item, i) => 
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
 