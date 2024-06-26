import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import SecondaryInput from "../shared/SecondaryInput";
import { selectIsLogged, selectToken } from "../../reducers/authenticationSlice";
import { useSelector } from "react-redux";
import CommentInitialValues from "../../formik/initialValues/CommentInitialValues";
import { useMutation } from "@tanstack/react-query";
import { AddComment } from "../../api/backend/comment";
import CommentYup from "../../formik/yup/CommentYup";
import { useState } from "react";
import profilePicturePlacehodler from "/images/profilePicturePlaceholder.webp"
import { Comment as LoadingComment } from "react-loader-spinner";
import { toast } from "react-toastify";

interface Comment {
    id: number;
    users: {
        profilePicture: string;
        name: string;
    };
    message: string;
}

interface CommentSectionProps {
    comments: Array<Comment>;
    art_id: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments: initialComments, art_id }) => {
    const isAuthenticated = useSelector(selectIsLogged);
    const token = useSelector(selectToken);
    const [errorLog, setErrorLog] = useState<string | null>(null);
    const [comments, setComments] = useState<Array<Comment>>(initialComments);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: any) => AddComment(values, token),
        onSuccess: (data) => {
            const newComment = data.data;
            setComments((prevComments) => [...prevComments, newComment]);
        },
        onError: (error) => {
            setErrorLog(error.message);
            toast.error("Une erreur est survenu !", {
                position: "bottom-right"
            });
        },
    });

    return (
        <StyledCommentContainer>
            <Title>Comments</Title>
            {
                comments.map((comment: Comment) =>
                    <CommentCard key={comment.id}>
                        <ProfilPicture src={`http://localhost:8000/uploads/profile_pictures/${comment.users.profilePicture}` ?? profilePicturePlacehodler} alt="profilPicture" />
                        <ContentContainer>
                            <CommentTitle>{comment.users.name}</CommentTitle>
                            <CommentContent>{comment.message}</CommentContent>
                            <Time>5 minutes</Time>
                        </ContentContainer>
                    </CommentCard>
                )
            }

            {isPending &&
                <LoadingComment
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color="#fff"
                    backgroundColor="#F5C754"
                />
            }

            {isAuthenticated &&
                <Formik
                    initialValues={CommentInitialValues}
                    validationSchema={CommentYup}
                    onSubmit={(values, { resetForm }) => {
                        mutate({ ...values, art_id })
                        resetForm()
                    }}
                >
                    <StyledForm>
                        <Field as={InputComment} type='text' name="message" />
                        {errorLog && <ErrorText>{errorLog}</ErrorText>}

                        <SecondaryInput type='submit' value='Post' />
                    </StyledForm>
                </Formik>
            }


        </StyledCommentContainer >
    );
}

const StyledCommentContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin: 1rem 0;
    gap: 1rem;
`;

const ErrorText = styled.p`
    color: red;
`;

const Title = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
`;

const CommentCard = styled.div`
    display: flex;
    border: 2px solid black;
    padding: 1rem;
    width: 80%;
    height: 10rem;
`;

const ProfilPicture = styled.img`
    border-radius: 50%;
    padding: 1rem;
    width:8rem;
    height: 8rem;
    object-fit: cover;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
`;

const CommentTitle = styled.p`
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

const StyledForm = styled(Form)`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 2rem;
    width: 80%;
    gap: 1rem;
`;

const InputComment = styled.input`
    padding:1rem;
    width: 100%;
`;

export default CommentSection;
