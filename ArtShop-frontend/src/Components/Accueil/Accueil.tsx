import './Accueil.css';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { listArt } from "../../api/backend/art";
import axios from "axios";
import { filterArt } from '../../api/backend/category';
import React from "react";

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
  const [art, setArt] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInit, setSearch] = useState<string[]>([]);
  const validateSchema = Yup.object().shape({ search: Yup.string() });
  let copy = art;
  const handleChange = (event) => {
    setArt(copy);
    console.log("Avant")

    let temp = copy;
    setArt(temp.filter( (value) => {
      return event.target.value == value.categories_id;
    }));
    copy = art;
    console.log("Après")
    console.log(copy)
    console.log(temp)
  }

  const [filter, setFilter] = useState<FilterItem[]>([]);

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

  useEffect(() => {
    listArt()
      .then(response => {
        setArt(response.data);
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
                  <p>montre actuellement {0} produits sur {art.length}</p> <button>Voir tout</button>
                </ul>
              </ul>
              <li id="result" className='ligneProduit'>
                {
                  art && art.map((item2, i) => {
                    
                    return (
                      <ul className='produit' key={i}>
                        <img className="imageProduit" src={item2.image} alt="Produit" />
                        <h4 className="nomProduit">{item2.title}</h4>
                        <p className="detailProduit">{item2.description}</p>
                        <h3 className="prixProduit">{item2.price} $</h3>
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
