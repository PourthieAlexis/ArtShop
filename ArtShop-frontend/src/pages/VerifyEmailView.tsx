import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingIndicator from "../components/shared/LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "../api/backend/account";
import { selectToken } from "../reducers/authenticationSlice";
import { useSelector } from "react-redux";

export default function VerifyEmail() {
    const JWTtoken = useSelector(selectToken);

    const { token } = useParams<{ token: string }>();
    const { isSuccess, isLoading } = useQuery({
        queryKey: ['verifyEmail'],
        queryFn: () => verifyEmail(JWTtoken, token || ''),
        retry: false,
    });

    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/');
    };

    if (isLoading) return <LoadingIndicator isLoading={isLoading} />;

    if (!token) {
        return <div>Pas de token</div>;
    }

    return (
        <VerifyEmailContainer>
            {isSuccess &&
                <>
                    <Message>You have successfully verified your email.</Message>
                    <Button onClick={handleReturnHome}>Retour à la page d'accueil</Button>
                </>
            }
        </VerifyEmailContainer>
    );
}

const VerifyEmailContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Message = styled.div`
    font-size: 20px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;
