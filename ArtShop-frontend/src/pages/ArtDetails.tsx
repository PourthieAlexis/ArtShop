import styled from 'styled-components';
import Comment from '../components/Comment';
import Dropdown from '../components/Dropdown';
import { useQuery } from '@tanstack/react-query';
import { fetchArtDetails } from '../api/backend/art';
import { useParams } from 'react-router-dom';
import PrimaryInput from '../components/PrimaryInput';
import SecondaryInput from '../components/SecondaryInput';
import NumberInput from '../components/NumberInput';
import ArtworksByArtist from '../components/ArtworksByArtist';

interface Comment {
    id: number;
    users: {
        profilePicture: string;
        name: string;
    };
    message: string;
}

const ArtDetails: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();

    const { data, isLoading, isError } = useQuery({ queryKey: ['artDetails', uuid], queryFn: () => fetchArtDetails(uuid) });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    console.log(data);
    return (
        <PageContainer>
            <DetailsContainer>
                <ImageContainer>
                    <Image src={data.data.image} alt="placeholder" />
                    <Dropdown image={data.data.image} />
                </ImageContainer>
                <DetailsContent>
                    <Title>
                        <h1>{data.data.title}</h1>
                        <Price>{data.data.price}€</Price>
                    </Title>
                    <RateStar>⭐⭐⭐⭐⭐</RateStar>
                    <p>
                        {data.data.description}
                    </p>
                    <label htmlFor="quantity">
                        Quantité
                    </label>
                    <NumberInput type="number" defaultValue={1} />
                    <PrimaryInput type='button' value='Add To Cart' />
                    <SecondaryInput type='button' value='Buy Now' />
                    <Details>
                        <TitleDetails>
                            Détails
                        </TitleDetails>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Sit in incidunt ipsum non fuga nobis numquam dicta accusamus quo laborum, deserunt quaerat,
                            soluta nulla suscipit eaque obcaecati ipsa? Labore, corporis.
                        </p>
                    </Details>
                    <ArtistDetails>
                        <Artist>
                            <ArtistPicture src={data.data.users.profilePicture} alt="Artist profile picture"></ArtistPicture>
                            <TitleDetails>
                                {data.data.users.name}
                            </TitleDetails>
                        </Artist>
                    </ArtistDetails>
                </DetailsContent>
            </DetailsContainer >
            <ArtworksByArtist image={data.data.image} />
            <CommentContainer>
                {data.data.comments.map((comment: Comment) =>
                    <Comment image={comment.users.profilePicture} username={comment.users.name} content={comment.message} key={comment.id} />
                )}
                <InputComment type='text' />
                <SecondaryInput type='button' value='Post' />
            </CommentContainer>
        </PageContainer>
    );
}

const PageContainer = styled.section`
    padding: 4rem;
    min-height: 100vh;
    height: 100%;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    gap: 1rem;
`;

const Image = styled.img`
    width: 100%;
`;

const DetailsContainer = styled.div`
    display: flex;
    gap: 2rem;
`;

const Title = styled.div`
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin: 0;
        font-size: 2rem;
    }
`;

const Price = styled.div`
    font-weight: 700;
    font-size: 2rem;
`;

const RateStar = styled.div`
`;
const DetailsContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 1rem;
`;

const Details = styled.div`
    border-top: 1px solid black;
    padding: 1rem;
`;

const ArtistDetails = styled.div`
    border-top: 1px solid black;
`;

const ArtistPicture = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius:50%;
    padding: 0 1rem;
`

const Artist = styled.div`
    display: flex;
    align-items: center;
`;

const TitleDetails = styled.p`
    font-weight: 700;
    font-size: 1rem;
`;

const InputComment = styled.input`
    padding:1rem;
    width: 80%;
`;

const CommentContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 2rem;
    gap: 1rem;
`;

export default ArtDetails;
