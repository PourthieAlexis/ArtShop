import './Accueil.css';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { listArt } from "../../api/backend/art";
import { filterArt } from '../../api/backend/category';
import React from "react";
import { useNavigate } from 'react-router-dom';
interface ArtItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  categories_id: number;
}

interface FilterItem {
  id: number;
  name: string;
}

const regEx = /\$|\,|\;|\.|\+|\ /g;

const Accueil : React.FC = () => {

  const [artOriginal, setArtOriginal] = useState<ArtItem[]>([]);
  const [art, setArt] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInit, setSearch] = useState<string[]>([]);
  const validateSchema = Yup.object().shape({ search: Yup.string() });
  const [filter, setFilter] = useState<FilterItem[]>([]);
  const navigate = useNavigate();
  const copy = [...artOriginal];

  const handleChange = (event) => {
    if (event.target.value == 0) {
      setArt(copy);
      
    }
    else{
      setArt(copy);
      
      
      const temp = copy.filter((value) => {
        return event.target.value == value.categories.id;});
      setArt(temp);
    }
  }
  
  const formik = useFormik({
    initialValues: {
      search: "",
      filter: "",
    },
    validationSchema: validateSchema,

    onSubmit: (_values, { resetForm }) => {
      setLoading(true);
      setSearch(formik.values.search.split(regEx));
      console.log(formik.values.search);
      setTimeout(() => {
        setLoading(false);
        resetForm();
      }, 2000);
    },
  });

  useEffect(() => {
    listArt()
      .then(response => {
        setArt(response.data);
        setArtOriginal(response.data);
      })
      .catch(err => {
        console.error(err.data);
      });

    filterArt().then(
      response => {
        setFilter(response.data);
        
      }
    )
      .catch(err => {
        console.error(err.data);
      });
  }, []);

  return (
    <>
      <div className="accueil">
        <section className='section1'>
          <div className='searchDiv'>
            <form className="connexionForm" onSubmit={formik.handleSubmit}>
              <div>
                <StyledInput
                  className="searchbar"
                  type="text"
                  name="search"
                  onChange={formik.handleChange}
                  value={formik.values.search}
                />
              </div>
              <div className='searchButton'>
                <button className="searchFilter" disabled={loading} type={"submit"}>Filters</button>
                <select className="searchOrder" defaultValue={0} onChange={(event) => handleChange(event)}>
                  <option value="0">filter By</option>
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
                  <p>montre actuellement {art.length} produits sur {copy.length}</p> <button>Voir tout</button>
                </ul>
              </ul>
              <li id="result" className='ligneProduit'>
                {
                  
                  art && art.map((item, i) => {
                    
                    const handleClickButton =() => {
                      navigate("/art-detail/"+item.id, { replace: true });
                    }
                    return (
                      <ul className='produit' key={i}>
                        <img className="imageProduit" src={item.image} alt="Produit" />
                        <h4 className="nomProduit" >{item.title}</h4>
                        <p className="detailProduit">{item.description}</p>
                        <h3 className="prixProduit">{item.price} $</h3>
                        <button onClick = {handleClickButton}>Voir la page de l'oeuvre</button>
                      </ul>
                    )
                    }
                  )
                  
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
  width: 31rem;
  height: 2.5rem;
`;

export default Accueil;
