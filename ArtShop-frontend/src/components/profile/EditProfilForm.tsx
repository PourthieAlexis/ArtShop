import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import EditProfilYup from "../../formik/yup/EditProfilYup";
import PrimaryInput from "../shared/PrimaryInput";
import { useMutation } from "@tanstack/react-query";
import { editProfil } from "../../api/backend/account";
import { selectToken } from "../../reducers/authenticationSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface UserData {
    name: string;
    artistName: string;
    phone: string;
    address: string;
}

export interface IEditProfilFormProps {
    user: UserData
}

export default function EditProfilForm(props: IEditProfilFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        name: props.user.name,
        artistName: props.user.artistName,
        phone: props.user.phone,
        address: props.user.address
    });
    const token = useSelector(selectToken);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: any) => editProfil(values, token),
        onSuccess: () => {
            toast.success('Le profil a été modifié', {
                position: "bottom-right"
            });
            setIsEditing(false);
        },
        onError: () => {
            toast.error('Une erreur est survenue', {
                position: "bottom-right"
            });
        },
        onMutate(variables) {
            setUserData(variables);
        },
    });

    const onSubmit = (values: any) => {
        let isEqual = JSON.stringify(values) === JSON.stringify(userData);
        if (isEqual) {
            setIsEditing(false);
        } else {
            mutate(values)
        }
    }

    return (
        <>
            {isEditing ? (
                <Formik
                    initialValues={userData}
                    validationSchema={EditProfilYup}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <Container>
                            <Group>
                                <label htmlFor="name">Full Name:</label>
                                <Field
                                    as={FieldInput}
                                    type="text"
                                    id="name"
                                    name="name"
                                />
                                <ErrorMessage component={Error} name="name" />
                            </Group>
                            <Group>
                                <label htmlFor="artistName">Artist Name:</label>
                                <Field
                                    as={FieldInput}
                                    type="text"
                                    id="artistName"
                                    name="artistName"
                                />
                                <ErrorMessage component={Error} name="artistName" />
                            </Group>
                            <Group>
                                <label htmlFor="phone">Phone:</label>
                                <Field
                                    as={FieldInput}
                                    type="text"
                                    id="phone"
                                    name="phone"
                                />
                                <ErrorMessage component={Error} name="phone" />
                            </Group>
                            <Group>
                                <label htmlFor="address">Address:</label>
                                <Field
                                    as={FieldInput}
                                    type="text"
                                    id="address"
                                    name="address"
                                />
                                <ErrorMessage component={Error} name="address" />
                            </Group>
                        </Container>
                        <ButtonContainer>
                            <PrimaryInput value="Submit" type="submit" isLoading={isPending} style={{ width: '8rem' }} />
                        </ButtonContainer>
                    </Form>
                </Formik>
            ) : (
                <>
                    <Container>
                        <Group>
                            <label htmlFor="name">Full Name:</label>
                            {userData.name}
                        </Group>
                        <Group>
                            <label htmlFor="artistName">Artist Name:</label>
                            {userData.artistName}
                        </Group>
                        <Group>
                            <label htmlFor="phone">Phone:</label>
                            {userData.phone}
                        </Group>
                        <Group>
                            <label htmlFor="address">Address:</label>
                            {userData.address}
                        </Group>
                    </Container>
                    <ButtonContainer>
                        <PrimaryInput value="Edit" type="button" onClick={() => setIsEditing(true)} style={{ width: '8rem' }} />
                    </ButtonContainer>
                </>

            )}
        </>
    );
}

const Container = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 40%;
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`

const Group = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;
    flex-basis: calc(50% - 1rem);
    gap: 1rem;
    label {
        display: block;
        font-weight: bold;
        color: #384D6C;
    }
`;

const FieldInput = styled.input`
    width: 80%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
`;

const Error = styled.div`
    color: red;
    margin-top: 0.2rem;
`;