import React from 'react';
import styled from 'styled-components';

interface ArtworksByArtistProps {
    image: string
}

const ArtworksByArtist: React.FC<ArtworksByArtistProps> = ({ image }) => {

    return (
        <ArtworksByArtistContainer>
            <hr />
            <Title>Artwork by this artist</Title>
            <CardContainer>
                <Card>
                    <MiniImage src={image} alt="placeholder" />
                    <ArtName>Product name</ArtName>
                    <ArtPrice>55€</ArtPrice>
                </Card>            <Card>
                    <MiniImage src={image} alt="placeholder" />
                    <ArtName>Product name</ArtName>
                    <ArtPrice>55€</ArtPrice>
                </Card>
                <Card>
                    <MiniImage src={image} alt="placeholder" />
                    <ArtName>Product name</ArtName>
                    <ArtPrice>55€</ArtPrice>
                </Card>
            </CardContainer>
            <hr />
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
    justify-content: center;
    margin: 3rem 0;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
`
const MiniImage = styled.img`
    width: 100%;
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
