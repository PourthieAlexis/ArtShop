import './Accueil.css';
import {useEffect, useState} from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { listArt } from "../../api/backend/art";
import { filterArt } from '../../api/backend/category';

let arrayArt = [];
const regEx = /\$|\,|\;|\.|\+|\ /g ;

const Accueil = () =>
{
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInit, setSearch] = useState([]);
  const validateSchema = Yup.object().shape({search: Yup.string()});

  

  const [filter, setFilter] = useState([]);


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
      
      filterArt().then(
        response =>{
          setFilter(response.data);
          
        }
      )
      .catch(err =>{
        console.error(err.data);
      })

      
  },[])

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
                  <select className="searchOrder" defaultValue={0}>
                    <option value = "0">filter By</option>
                    {
                      filter && filter.map((item) => 
                        (<option key={item.id} value={item.id}>{item.name}</option>
                      ))
                    }
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
                  searchInit.map(elem => (<p key={elem} className='tag'>{elem}</p>))
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
                  
                  art && art.map((item2, i) => 
                  {
                    let n = 1;
                    if (document.getElementsByClassName("searchOrder").item(0).value == 0){
                      return(
                        <ul className='produit' key={i}>
                        <img className="imageProduit" src={item2.image} alt="Produit" />
                        <h4 className="nomProduit">{item2.title}</h4>
                        <p className="detailProduit">{item2.description}</p>
                        <h3 className="prixProduit">{item2.price} $</h3>
                        </ul>
                      )
                    }
                    else {
                      filter && filter.forEach(cat => {
                        if (cat.id == document.getElementsByClassName("searchOrder").item(0).value)
                        {n= cat.id-1;}
                      })

                      try {
                        return filter && (filter[n].id == item2.categories_id) ?
                        (<ul className='produit' key={i}>
                      <img className="imageProduit" src={item2.image} alt="Produit" />
                      <h4 className="nomProduit">{item2.title}</h4>
                      <p className="detailProduit">{item2.description}</p>
                      <h3 className="prixProduit">{item2.price} $</h3>
                      </ul>
                        ): null
                      } catch (error) {
                        console.log("loading");
                      }
                    }
                  })
                }
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
 