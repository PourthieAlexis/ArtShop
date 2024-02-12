import styled from "styled-components";

const Comment: React.FC = () => {
    return (
        <CommentCard>
            <Title>
                Username Here
            </Title>
            <CommentContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
                distinctio expedita iusto vero, minima id omnis veritatis a commodi,
                facere inventore! Tempore, maiores libero adipisci repellat saepe itaque rerum! Quas.
            </CommentContent>
            <Time>5 minutes</Time>
        </CommentCard>
    );
}

const CommentCard = styled.div`
    border: 2px solid black;
    padding: 1rem;
    width: 80%;
`;

const Title = styled.p`
    width: 80%;
    height: 2rem;
`;

const CommentContent = styled.p`
    font-size: 1rem;
`;

const Time = styled.p`
    font-size: small;
`;

export default Comment;
