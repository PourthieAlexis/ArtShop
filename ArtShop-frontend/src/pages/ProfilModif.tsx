import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { getProfile, setProfile } from "../api/backend/account";
import React from "react";

import { useParams, useNavigate, Form } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
interface ProfileItem {
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
  

const ProfilModif : React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({ search: Yup.string() });
    const {mutate} = useMutation({ mutationFn: setProfile });
    const formik = useFormik({
        initialValues: {
        id : uuid,
        firstName:"",
        lastName:"",
        userName: "",
        adresse: '',
        mail: "",
        phoneNumber: "",
        },
    validationSchema: validateSchema,

    onSubmit: (values) => {
        console.log("formik");
        console.log(formik.values);
        mutate({ ...values, uuid: uuid}, {
            onSuccess(data) {
                console.log(data.data.token);
            },
            onError(error) {
                console.log(error.message);
            },
        });
        },
    });
    const handlePassword =() =>{
        console.log("1");
    }
    const handleSignOut =() =>{
        console.log("2");
    }

    
    const { data, isLoading, isError } = useQuery({ queryKey: ['getProfile', uuid], queryFn: () => getProfile(uuid) });
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    console.log(data);
    
    return (
        <>
            <StyledDiv className='profil'>
                <form className="form" action="{{ path('techevent_reservation') }}" onSubmit={formik.handleSubmit} method="post">
                    <StyledDiv className='subDiv grid' >
                        <StyledDiv className = 'conteneur'>
                            <h4>First Name</h4>
                            <StyledInput 
                                name = "firstName"
                                value = {formik.values.firstName}
                                onChange={formik.handleChange}
                                type="text"
                            />
                        </StyledDiv>
                        <StyledDiv className = 'conteneur'>
                            <h4>Last Name</h4>
                            <StyledInput 
                                name = "lastName"
                                value = {formik.values.lastName}
                                onChange={formik.handleChange}
                                type="text"
                            />
                        </StyledDiv>
                        <StyledDiv className="conteneur">
                            <h4>User Name</h4>
                            <StyledInput 
                                name = "userName"
                                value = {formik.values.userName}
                                onChange={formik.handleChange}
                                type="text"
                            />
                        </StyledDiv>
                        <StyledDiv className="conteneur">
                        <h4>Address</h4>
                        <StyledInput 
                            name = "adresse"
                            value = {formik.values.adresse}
                            onChange={formik.handleChange}
                            type="text"
                        />
                        </StyledDiv>
                    </StyledDiv>
                    <StyledDiv className='subDiv grid'>
                        <StyledDiv className = 'conteneur'>
                            <h4>Mail</h4>
                            <StyledInput 
                                name = "mail"
                                value = {formik.values.mail}
                                onChange={formik.handleChange}
                                type="email"
                            />
                        </StyledDiv>
                        <StyledDiv className = 'conteneur'>
                            <h4>Phone Number</h4>
                            <StyledInput 
                                name = "phoneNumber"
                                value = {formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                type="number"
                            />
                        </StyledDiv>    
                        
                        <p className='ligneBouton'>Changer le mot de passe : <StyledButton className="modifier" id = "passwordChange" onClick={() =>handlePassword}>Modifier</StyledButton></p> 
                    </StyledDiv>
                    <StyledDiv className='subDiv artDiv'>
                        <h4>Oeuvres</h4>
                        <ul>
                            {data.data.arts.map((art: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (<h3 key = {art.id} onClick={() =>{navigate("/art-detail/"+art.id, { replace: true })}}>{art.title}</h3>))}
                        </ul>
                    </StyledDiv>
                    <StyledFooter>
                        <StyledSignOut className = "Deconnexion" id="signOut" onClick={() => handleSignOut}>Sign Out</StyledSignOut>
                        <StyledValidate className = "Valider" id="validate" type="submit" value="Effectuer les changements"/>
                    </StyledFooter>
                </form>
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
        margin-left: 12rem;
        margin-right: 12rem;
        border: 0.1rem solid grey;
        border-left: none;
        border-right: none;
        border-bottom : none;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        
    }
    .artDiv{
        display:flex;
        flex-direction: column !important;
        align-items:flex-start;
        border-bottom : 0.1rem solid grey;
    }
    h4{
        color : #3c6b99;
    }
    .ligneBouton{
        padding-top : 1rem;
    }

    h3:hover{
        color : blue;
    }
    ul{
        display : flex;
        flex-direction : column;
    }

    .grid{
        grid-template-columns: repeat(2, 1fr);
        display: grid;
    }
`
const StyledFooter  = styled.footer`
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
`;
const StyledButton = styled.button`
    background-color : #F5C754;
    border-radius: 0.25rem;
    border : none;
    width: 5rem;
    height: 2rem;
    font-weight: bold;

    .modifier{
        margin-left: 3rem;
    }
    .modifier&:hover {
        background-color : lightblue;
    }
`
const StyledSignOut = styled.button`
    width:12rem;
    height:2.5rem;
    font-weight: bold;
    background-color : red;
    border-radius: 0.25rem;
    border : none;
    &:hover {
        background-color : pink;
    }
`
const StyledValidate = styled.input`
    width:12rem;
    height:2.5rem;
    font-weight: bold;
    background-color : #F5C754;
    border-radius: 0.25rem;
    border : none;
    &:hover {
        background-color : green;
    }
`
const StyledInput =  styled.input`
    width: 18rem;
    height: 1.5rem;
    border-radius: 0.3rem;
    border-color: lightgrey;
`;

const StyledOutput =  styled.output`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    flex-basis: 50%;
    align-content: center;
    align-content: flex-start;
`;

export default ProfilModif;