import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { createArt } from '../api/backend/art';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectToken } from '../reducers/authenticationSlice';
import { useNavigate } from 'react-router-dom';
import { URL_HOME } from '../constants/urls/urlFrontend';
import CreateArtForm from '../components/CreateArtForm';

const CreateArtView = () => {
    const token = useSelector(selectToken);
    const navigate = useNavigate();


    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => createArt(formData, token),
        onSuccess: () => {
            navigate(URL_HOME);
            toast.success('Art created !', {
                position: 'bottom-right',
            });
        },
        onError: () => {
            toast.error('Une erreur est survenue !', {
                position: 'bottom-right',
            });
        },
    });

    const onSubmit = (values: any) => {
        mutate(values);
    };

    return (
        <CreateArtContainer>
            <Title>Add ArtWorks</Title>
            <CreateArtForm onSubmit={onSubmit} isPending={isPending} />
        </CreateArtContainer>
    );
};

const Title = styled.h2`
    padding: 0 1rem;
    display: flex;
    justify-content: center;
`
const CreateArtContainer = styled.section`
    max-width: 30rem;
    margin: 0 auto;
`;


export default CreateArtView;
