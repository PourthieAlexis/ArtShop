import React from 'react';
import styled from 'styled-components';
import CardArtWork from '../accueil/CardArtWork';


interface Art {
    id: string;
    image: string;
    title: string;
    categories: {
        id: string;
        name: string
    };
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
                <Title>Artwork by this artist</Title>
                <CardContainer>
                    {userArt && userArt.map((art) => (
                        <CardArtWork
                            id={art.id}
                            title={art.title}
                            category={art.categories.name}
                            price={art.price}
                            image={`http://localhost:8000/uploads/images/${art.image}`}
                            key={art.id}
                        />
                    ))}
                </CardContainer>
                <hr />
            </>}
        </ArtworksByArtistContainer>
    );
};

const ArtworksByArtistContainer = styled.section`
    width: 100%;
    margin-top: 5rem;
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
    flex-wrap: wrap;
`

export default ArtworksByArtist;
