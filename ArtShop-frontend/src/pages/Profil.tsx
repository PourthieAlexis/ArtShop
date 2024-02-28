import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { getProfile } from "../api/backend/account";
import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
  

const Profil : React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const navigate = useNavigate();


    const validateSchema = Yup.object().shape({ search: Yup.string() });

    const formik = useFormik({
        initialValues: {
        firstName:"Undefined",
        lastName:"Undefined",
        userName: "Undefined",
        adresse: 'Undefined',
        mail:'Undefined',
        phoneNumber:'Undefined',
        },
    validationSchema: validateSchema,

    onSubmit: (values, { resetForm }) => {
            setTimeout(() => {
                resetForm();
            }, 2000);
        },
    });

    const { data, isLoading, isError } = useQuery({ queryKey: ['artDetails', uuid], queryFn: () => getProfile(uuid) });
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    console.log(data);
    const temp = data.data.name.split(" ");
    
    return (
        <>
            <StyledDiv className='profil'>
                <form>
                    <StyledDiv className='subDiv'>
                        <StyledOutput name = "firstName">
                            <h4>First Name :</h4>
                            {temp[0]}
                        </StyledOutput>
                        <StyledOutput name = "lastName">
                            <h4>Last Name :</h4>
                            {temp[1]}
                        </StyledOutput>
                        <StyledOutput name = "userName">
                            <h4>User Name :</h4>
                            {data.data.name}
                        </StyledOutput>
                        <StyledOutput name = "adresse">
                            <h4>Address :</h4>
                            {data.data.address}
                        </StyledOutput>
                    </StyledDiv>
                    <StyledDiv className='subDiv'>
                        <StyledOutput name = "mail">
                            <h4>Mail</h4>
                            {data.data.email}
                        </StyledOutput>
                        <StyledOutput name = "phoneNumber">
                            <h4>Phone Number</h4>
                            {formik.values.phoneNumber}
                        </StyledOutput>
                            <p className='ligneBouton'>Changer le mot de passe : <StyledButton className="modifier" type={"submit"}>Modifier</StyledButton></p> 
                    </StyledDiv>
                    <StyledDiv className='subDiv artDiv'>
                        <h4>Oeuvres</h4>
                        <ul>
                            {data.data.arts.map((art: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (<h3 key = {art.id} onClick={() =>{navigate("/art-detail/"+art.id, { replace: true })}}>{art.title}</h3>))}
                        </ul>
                    </StyledDiv>
                </form>

                <StyledFooter>
                    <StyledSignOut onClick={ () => {}}>
                        Sign Out
                    </StyledSignOut>
                    <StyledModif onClick={ () => {navigate("/profile-modify/"+data.data.id, { replace: true })}}>
                        modifier le compte
                    </StyledModif>
                </StyledFooter>
            </StyledDiv>
        </>
        
    )
}
const StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
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
`
const StyledFooter  = styled.div`
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
`
const StyledSignOut = styled.button`
    width:12rem;
    height:2.5rem;
    font-weight: bold;
    background-color : red;
    border-radius: 0.25rem;
    border : none;
`
const StyledModif = styled.button`
    width:12rem;
    height:2.5rem;
    font-weight: bold;
    background-color : #F5C754;
    border-radius: 0.25rem;
    border : none;
`
const StyledOutput =  styled.output`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    flex-basis: 50%;
    align-content: center;
    align-content: flex-start;
`;

export default Profil;