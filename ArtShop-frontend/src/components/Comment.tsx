import styled from "styled-components";

interface CommentProps {
    image: string;
    username: string;
    content: string
}

const Comment: React.FC<CommentProps> = ({ image, username, content }) => {
    return (
        <CommentCard>
            <ProfilPictureContainer>
                <ProfilPicture src={image} alt="profilPicture" />
            </ProfilPictureContainer>
            <CommentContainer>
                <Title>
                    {username}
                </Title>
                <CommentContent>
                    {content}
                </CommentContent>
                <Time>5 minutes</Time>
            </CommentContainer>
        </CommentCard>
    );
}

const CommentCard = styled.div`
    display: flex;
    border: 2px solid black;
    padding: 1rem;
    width: 80%;
`;

const ProfilPictureContainer = styled.div`
    display: flex;
    align-items: center;
    padding-right: 1rem;
`
const ProfilPicture = styled.img`
    border-radius:50%;
`;

const CommentContainer = styled.div`
display: flex;
flex-direction:column;
    width:80%;
    height: 100%;
`;

const Title = styled.p`
    width: 80%;
    margin: 0;
    margin-bottom: 2rem;
    font-size: 24px;
`;

const CommentContent = styled.p`
    font-size: 1rem;
`;

const Time = styled.p`
    font-size: small;
`;

export default Comment;
