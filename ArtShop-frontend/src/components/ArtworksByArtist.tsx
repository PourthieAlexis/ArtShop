import React from 'react';
import styled from 'styled-components';


interface Art {
    id: number;
    image: string;
    title: string;
    price: number;
}

interface ArtworksByArtistProps {
    userArt: Array<Art>
    isLoading: boolean
}

const ArtworksByArtist: React.FC<ArtworksByArtistProps> = ({ userArt, isLoading }) => {

    return (
        <ArtworksByArtistContainer>
            {!isLoading && <>
                <hr />
                <Title>Oeuvres de cette artiste</Title>
                <CardContainer>
                    {userArt && userArt.map((art) => (
                        <Card key={art.id}>
                            <MiniImage src={`http://localhost:8000/uploads/images/${art.image}`} alt="placeholder" />
                            <ArtName>{art.title}</ArtName>
                            <ArtPrice>{art.price}€</ArtPrice>
                        </Card>
                    ))}
                </CardContainer>
                <hr /></>}
        </ArtworksByArtistContainer>
    );
};

const ArtworksByArtistContainer = styled.section`
    width: 100%;
    margin: 5rem 0;
`

const Title = styled.h2`
    display: flex;
    justify-content: center;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 3rem 0;
    width: 100%;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    background-color: #d7e9f8;
    border-radius: 4px;
`
const MiniImage = styled.img`
    width: 100%;
    height: 20rem;
    object-fit: contain;
`;

const ArtName = styled.p`
    font-size: 1rem;
    font-weight: 600;
`

const ArtPrice = styled.p`
    font-size: 1rem;
    font-weight: 600;
`

export default ArtworksByArtist;
