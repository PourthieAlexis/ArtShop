import styled from 'styled-components';
import CommentSection from '../components/art-detail/CommentSection';
import Dropdown from '../components/art-detail/Dropdown';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchArtDetails, getUserArtWorksByUuid } from '../api/backend/art';
import { useParams } from 'react-router-dom';
import PrimaryInput from '../components/shared/PrimaryInput';
import SecondaryInput from '../components/shared/SecondaryInput';
import NumberInput from '../components/shared/NumberInput';
import ArtworksByArtist from '../components/art-detail/ArtworksByArtist';
import { addToCart } from '../api/backend/cart';
import { selectToken } from '../reducers/authenticationSlice';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import AddToCartInitialValues from '../formik/initialValues/AddToCartInitialValues';
import AddToCartYup from '../formik/yup/AddToCartYup';
import { toast } from 'react-toastify';
import LoadingIndicator from '../components/shared/LoadingIndicator';

const ArtDetailsView: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const token = useSelector(selectToken);

    const { data: art, isLoading, isError } = useQuery({ queryKey: ['artDetails', uuid], queryFn: () => fetchArtDetails(uuid) });
    const userId = art?.data.users?.id

    const { data: userArtWorks, isLoading: isUserArtWorksLoading } = useQuery({ queryKey: ['userArtWorks'], queryFn: () => getUserArtWorksByUuid(userId), enabled: !!userId })

    const { mutate } = useMutation({
        mutationFn: (values: any) => addToCart(values, token),
        onSuccess: () => {
            toast.success("L'oeuvre a été ajouté à votre panier !", {
                position: "bottom-right"
            });
        },
        onError: () => {
            toast.error("Une erreur est survenu !", {
                position: "bottom-right"
            });
        },
    });

    if (isLoading) return <LoadingIndicator isLoading={isLoading} />
    if (isError) return <div>Error fetching data</div>;

    return (
        <PageContainer>
            <DetailsContainer>
                <ImageContainer>
                    <Image src={`http://localhost:8000/uploads/images/${art.data.image}`} alt="placeholder" />
                    <Dropdown image={`http://localhost:8000/uploads/images/${art.data.image}`} />
                </ImageContainer>
                <DetailsContent>
                    <Title>
                        <h1>{art.data.title}</h1>
                        <Price>{art.data.price}€</Price>
                    </Title>
                    <RateStar>⭐⭐⭐⭐⭐</RateStar>
                    <p>{art.data.description}</p>
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
                            <ArtistPicture src={`http://localhost:8000/uploads/profile_pictures/${art.data.users.profilePicture}`} alt="Artist profile picture" />
                            <TitleDetails>{art.data.users.name}</TitleDetails>
                        </Artist>
                    </ArtistDetails>
                </DetailsContent>
            </DetailsContainer>

            <ArtworksByArtist userArt={userArtWorks?.data} isLoading={isUserArtWorksLoading} />

            <CommentSection comments={art.data.comments} art_id={art.data.id} />
        </PageContainer>
    );
}

const PageContainer = styled.section`
    padding: 4rem;
    min-height: 100vh;
    height: 100%;
    display: flex;
    flex-direction: column;
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
    height: 33rem;
    width: 100%;
    object-fit: contain;
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
    gap:1rem;
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
