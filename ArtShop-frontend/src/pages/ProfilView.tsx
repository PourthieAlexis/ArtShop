import styled from 'styled-components';
import EditProfilForm from '../components/EditProfilForm';
import ProfilInfo from '../components/ProfilInfo';
import UserArtworks from '../components/UserArtWorks';
import { useQuery } from '@tanstack/react-query';
import { selectToken } from '../reducers/authenticationSlice';
import { useSelector } from 'react-redux';
import { getUser } from '../api/backend/account';
import ChangeProfilePicture from '../components/ChangeProfilPicture';

export default function ProfilView() {

    const token = useSelector(selectToken);

    const { data: user, isLoading, isError } = useQuery({ queryKey: ['UserProfil'], queryFn: () => getUser(token) });

    if (isLoading) {
        return null
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
    margin: 0 auto;
`;