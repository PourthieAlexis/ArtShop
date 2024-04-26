import styled from 'styled-components';
import EditProfilForm from '../components/profile/EditProfilForm';
import ProfilInfo from '../components/profile/ProfilInfo';
import UserArtworks from '../components/profile/UserArtWorks';
import { useQuery } from '@tanstack/react-query';
import { selectToken } from '../reducers/authenticationSlice';
import { useSelector } from 'react-redux';
import { getUser } from '../api/backend/account';
import ChangeProfilePicture from '../components/profile/ChangeProfilPicture';
import LoadingIndicator from '../components/shared/LoadingIndicator';

export default function ProfilView() {

    const token = useSelector(selectToken);

    const { data: user, isLoading, isError } = useQuery({ queryKey: ['UserProfil'], queryFn: () => getUser(token) });

    if (isLoading) {
        return <LoadingIndicator isLoading={isLoading} />
    }
    if (isError) {
        return null
    }
    return (
        <ProfileContainer>
            {user &&
                <>
                    <ChangeProfilePicture currentPictureUrl={user.data.profilePicture} />
                    <EditProfilForm user={user.data} />
                    <ProfilInfo email={user.data.email} />
                    <UserArtworks artworks={user.data.arts} />
                </>
            }
        </ProfileContainer>
    );
}


const ProfileContainer = styled.section`
    max-width: 60%;
    margin: 1rem auto;
`;