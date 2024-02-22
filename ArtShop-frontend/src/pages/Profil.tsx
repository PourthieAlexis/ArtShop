import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { listArt } from "../api/backend/art";
import React from "react";

interface ProfilItem {
    id : number;
    firstName : string;
    lastName : string;
    name: string;
    email: string;
    phoneNumber : number;
}

interface ArtItem {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    categories_id: number;
  }
  

const Profil : React.FC = () => {
    const [art, setArt] = useState<ArtItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchInit, setSearch] = useState<string[]>([]);
    const validateSchema = Yup.object().shape({ search: Yup.string() });
    const regEx = /\$|\,|\;|\.|\+|\ /g;

    const formik = useFormik({
        initialValues: {
        search: "",
        filter: "",
        firstName:"Bob",
        },
    validationSchema: validateSchema,

    onSubmit: (values, { resetForm }) => {
            setTimeout(() => {
                setLoading(false);
                resetForm();
            }, 2000);
        },
    });

    return (
        <>
            <StyledDiv className='profil'>
                    <StyledDiv className='subDiv'>
                        <StyledOutput name = "firstName">
                            <h4>First Name :</h4>
                            Bob
                        </StyledOutput>
                        <StyledOutput name = "lastName">
                            <h4>Last Name</h4>
                            Marlin
                        </StyledOutput>
                        <StyledOutput name = "userName">
                            <h4>User Name</h4>
                            User1
                        </StyledOutput>
                        <StyledOutput name = "adresse">
                            <h4>Address</h4>
                            Adresse
                        </StyledOutput>
                    </StyledDiv>
                    <StyledDiv className='subDiv'>
                        <StyledOutput name = "mail">
                            <h4>Mail</h4>
                            mail
                        </StyledOutput>
                        <StyledOutput name = "phoneNumber">
                            <h4>Phone Number</h4>
                            0754871239
                        </StyledOutput>
                        <p>Changer le mot de passe : <button className="modifier" disabled={loading} type={"submit"}>Modifier</button></p> 
                    </StyledDiv>

                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
            </StyledDiv>
            
        </>
        
    )
}
const StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;

    .subDiv{
        display: flex;
        margin-bottom:1rem;
        border: 0.1rem solid grey;
        border-left: none;
        border-right: none;
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const StyledUl = styled.ul`
    display: flex;
    justify-content: space-around;
`;
const StyledOutput =  styled.output`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    flex-basis: 50%;
    align-content: center;
`;
export default Profil;