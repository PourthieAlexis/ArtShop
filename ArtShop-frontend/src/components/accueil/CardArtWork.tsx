import styled from 'styled-components';
import { Link } from "react-router-dom";
import { URL_DETAILS_ART } from '../../constants/urls/urlFrontend';

export interface ICardArtWorkProps {
    id: string,
    title: string,
    category: string,
    price: number,
    image: string,
}

export default function CardArtWork(props: ICardArtWorkProps) {
    return (
        <StyledLink to={`${URL_DETAILS_ART}${props.id}`}>
            <CardContainer>
                <ProductImage src={props.image}></ProductImage>
                <ProductTitle>{props.title}</ProductTitle>
                <Category>{props.category}</Category>
                <Price>{props.price} €</Price>
            </CardContainer>
        </StyledLink>
    );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;    
  margin-bottom: 3rem;
`;


const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: calc(18rem - 2rem);
    height: 20rem;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 2px 1px 7px black;
    cursor: pointer;
`

const ProductImage = styled.img`
    object-fit: contain;
    width: 100%;
    height: 14rem;
`

const ProductTitle = styled.p`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0;
`

const Category = styled.p`
    font-size: 12px;
`

const Price = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin: 0;
`