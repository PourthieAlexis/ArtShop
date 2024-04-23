import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

interface ChangeProfilePictureProps {
    currentPictureUrl: string;
}

const ChangeProfilePicture: React.FC<ChangeProfilePictureProps> = ({ currentPictureUrl }) => {
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    return (
        <ProfilePictureContainer>
            <ProfilePicture src={previewImageUrl || currentPictureUrl} alt="Profile" />
            <Formik
                initialValues={{ image: null }}
                validationSchema={Yup.object().shape({
                    image: Yup.mixed().required('Une image est requise')
                        .test('fileSize', "Le fichier est trop volumineux", (value: any) => {
                            if (value && 'size' in value) {
                                return value.size <= 5000000;
                            }
                            return true;
                        })
                        .test('fileType', "Le fichier doit être une image", (value: any) => {
                            if (value && 'type' in value) {
                                return value.type.startsWith('image/');
                            }
                            return true;
                        })
                })}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ setFieldValue }) => (
                    <Form encType="multipart/form-data">
                        <FileInputContainer>
                            <FieldInput
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={(event) => {
                                    const files = event.currentTarget.files?.[0];
                                    if (files) {
                                        setPreviewImageUrl(URL.createObjectURL(files));
                                        setFieldValue("image", files);
                                    }
                                }}
                            />
                        </FileInputContainer>
                        <ErrorMessage name="image" component="div" />
                        <ChangeProfilePictureButton htmlFor="image">Changer d'image</ChangeProfilePictureButton>
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
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
`;

const FileInputContainer = styled.div`
    position: relative;
    margin-bottom: 10px;
`;

const FieldInput = styled.input`
    width: calc(100% - 1rem);
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ChangeProfilePictureButton = styled.label`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
`;

export default ChangeProfilePicture;
