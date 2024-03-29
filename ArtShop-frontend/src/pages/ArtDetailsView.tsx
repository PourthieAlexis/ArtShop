import styled from 'styled-components';
import CommentSection from '../components/CommentSection';
import Dropdown from '../components/Dropdown';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchArtDetails } from '../api/backend/art';
import { useParams } from 'react-router-dom';
import PrimaryInput from '../components/PrimaryInput';
import SecondaryInput from '../components/SecondaryInput';
import NumberInput from '../components/NumberInput';
import ArtworksByArtist from '../components/ArtworksByArtist';
import { addToCart } from '../api/backend/cart';
import { selectToken } from '../reducers/authenticationSlice';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import AddToCartInitialValues from '../formik/initialValues/AddToCartInitialValues';
import AddToCartYup from '../formik/yup/AddToCartYup';
import { toast } from 'react-toastify';

const ArtDetailsView: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const token = useSelector(selectToken);

    const { data, isLoading, isError } = useQuery({ queryKey: ['artDetails', uuid], queryFn: () => fetchArtDetails(uuid) });

    const { mutate } = useMutation({
        mutationFn: (values: any) => addToCart(values, token),
        onSuccess: (data) => {
            toast.success("L'oeuvre a été ajouté à votre panier !", {
                position: "bottom-right"
            });
        },
        onError: (error) => {
            toast.error("Une erreur est survenu !", {
                position: "bottom-right"
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    console.log(data);
    return (
        <PageContainer>
            <DetailsContainer>
                <ImageContainer>
                    <Image src={data.data.art.image} alt="placeholder" />
                    <Dropdown image={data.data.art.image} />
                </ImageContainer>
                <DetailsContent>
                    <Title>
                        <h1>{data.data.art.title}</h1>
                        <Price>{data.data.art.price}€</Price>
                    </Title>
                    <RateStar>⭐⭐⭐⭐⭐</RateStar>
                    <p>{data.data.art.description}</p>
                    <label htmlFor="quantity">Quantité</label>

                    <Formik
                        initialValues={AddToCartInitialValues}
                        validationSchema={AddToCartYup}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)
                            mutate({ ...values, art_id: uuid });
                            resetForm()
                        }}
                    >
                        <AddCartForm>
                            <NumberInput id="quantity" name="quantity" />
                            <PrimaryInput type='submit' value='Add To Cart' />
                        </AddCartForm>
                    </Formik>

                    <SecondaryInput type='button' value='Buy Now' />
                    <Details>
                        <TitleDetails>Détails</TitleDetails>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </Details>
                    <ArtistDetails>
                        <Artist>
                            <ArtistPicture src={data.data.art.users.profilePicture} alt="Artist profile picture" />
                            <TitleDetails>{data.data.art.users.name}</TitleDetails>
                        </Artist>
                    </ArtistDetails>
                </DetailsContent>
            </DetailsContainer>

            {data.data.user_arts.length !== 0 && <ArtworksByArtist userArt={data.data.user_arts} />}

            <CommentSection comments={data.data.art.comments} art_id={data.data.art.id} />
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
    justify-content: center;
    flex-wrap: wrap;
    align-content: start;
    gap: 1rem;
`;

const Image = styled.img`
    height:33rem;
    width:100%;
    object-fit:contain;
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
    gap:1rem;
    h1{
        margin: 0;
        font-size: 2rem;
    }
`;

const AddCartForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap:1rem
`;

const Price = styled.div`
    font-weight: 700;
    font-size: 2rem;
`;

const RateStar = styled.div``;

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
`;

const Artist = styled.div`
    display: flex;
    align-items: center;
`;

const TitleDetails = styled.p`
    font-weight: 700;
    font-size: 1rem;
`;




export default ArtDetailsView;
