import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import styled from 'styled-components';
import SecondaryInput from './SecondaryInput';
import { useMutation } from '@tanstack/react-query';
import { changeProfilePicture } from '../api/backend/account';
import { selectToken } from '../reducers/authenticationSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ChangeProfilePictureInitialValues from '../formik/initialValues/ChangeProfilePictureInitialValues';
import ChangeProfilePictureYup from '../formik/yup/ChangeProfilePictureYup';

interface ChangeProfilePictureProps {
    currentPictureUrl: string;
}

const ChangeProfilePicture: React.FC<ChangeProfilePictureProps> = ({ currentPictureUrl }) => {
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const token = useSelector(selectToken);

    const { mutate } = useMutation({
        mutationFn: (formData) => changeProfilePicture(formData, token),
        onSuccess: () => {
            toast.success('Profil picture changed !', {
                position: 'bottom-right',
            });
        },
        onError: () => {
            toast.error('Une erreur est survenue !', {
                position: 'bottom-right',
            });
        },
    });

    return (
        <ProfilePictureContainer>
            <ProfilePicture src={previewImageUrl || `http://localhost:8000/uploads/profile_pictures/${currentPictureUrl}`} alt="Profile" />
            <Formik
                initialValues={ChangeProfilePictureInitialValues}
                validationSchema={ChangeProfilePictureYup}
                onSubmit={(values: any, { setSubmitting }) => {
                    mutate(values, {
                        onSettled() {
                            setSubmitting(false)
                        },
                    })
                }}
            >
                {({ setFieldValue, isSubmitting, submitForm }) => (
                    <Form encType="multipart/form-data">
                        <FileInputContainer>
                            <FieldInput
                                style={{ height: 'auto' }}
                                type="file"
                                id="picture"
                                name="picture"
                                accept="image/*"
                                onChange={async (event) => {
                                    const files = event.currentTarget.files?.[0];
                                    if (files) {
                                        setFieldValue("picture", files);
                                        setPreviewImageUrl(URL.createObjectURL(files));
                                        await Promise.resolve()
                                        submitForm()
                                    }
                                }}
                                disabled={isSubmitting}
                            />
                        </FileInputContainer>
                        <ErrorMessage name="picture" component={Error} />
                    </Form>
                )}
            </Formik>
        </ProfilePictureContainer>
    );
};

const ProfilePictureContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ProfilePicture = styled.img`
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin-right: 20px;
`;

const FileInputContainer = styled.div`

`;

const Error = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
`;

const FieldInput = styled(SecondaryInput)`
    &::file-selector-button {
        background-color: #F5C754;
        color: #141C24;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
    }
`;

export default ChangeProfilePicture;
