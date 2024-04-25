import { Formik, Form, Field, ErrorMessage, FormikValues, } from 'formik';
import PrimaryInput from '../components/PrimaryInput';
import CreateArtYup from '../formik/yup/CreateArtYup';
import CreateArtInitialValues from '../formik/initialValues/CreateArtInitialValues';
import { BiTrash } from 'react-icons/bi';
import styled from 'styled-components';
import { getCategory } from '../api/backend/category';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectToken } from '../reducers/authenticationSlice';

export interface ICreateArtFormProps {
    onSubmit: (values: FormikValues) => void;
    isPending: boolean;
}

export default function CreateArtForm(props: ICreateArtFormProps) {
    const token = useSelector(selectToken);

    const { data: category, isLoading, isError } = useQuery({ queryKey: ['getCategory'], queryFn: () => getCategory(token) });
    return (
        <Formik
            initialValues={CreateArtInitialValues}
            validationSchema={CreateArtYup}
            onSubmit={props.onSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form encType="multipart/form-data">
                    <FormGroup>
                        <label htmlFor="title">Titre :</label>
                        <Field
                            as={FieldInput}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter the title"
                        />
                        <ErrorMessage name="title" component={Error} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="category">Catégorie :</label>
                        <Field
                            as={FieldSelect}
                            id="category"
                            name="category"
                            placeholder="Select the category"
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                const selectedCategory = event.target.value;
                                setFieldValue('category', selectedCategory);
                            }}
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {isLoading ? (
                                <option value="">Chargement...</option>
                            ) : isError ? (
                                <option value="">Erreur lors du chargement des catégories</option>
                            ) : (category &&
                                category.data.map((category: any) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))
                            )}
                        </Field>
                        <ErrorMessage name="category" component={Error} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="image">Image :</label>
                        <FileInputContainer>
                            <FieldInput
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    setFieldValue("image", files?.[0]);
                                }}
                            />
                        </FileInputContainer>
                        <ErrorMessage name="image" component={Error} />
                        {values.image && (
                            <ImagePreviewContainer>
                                <ClearImageButton
                                    onClick={() => {
                                        setFieldValue("image", null);
                                        const input = document.getElementById("image") as HTMLInputElement;
                                        if (input) {
                                            input.value = "";
                                        }
                                    }}
                                />
                                <SelectedImagePreview>
                                    <img
                                        src={URL.createObjectURL(values.image)}
                                        alt="Selected preview"
                                    />
                                </SelectedImagePreview>
                            </ImagePreviewContainer>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="description">Description :</label>
                        <Field
                            as={FieldArea}
                            id="description"
                            name="description"
                            rows="5"
                            cols="33"
                            placeholder="Enter the description"
                        />
                        <ErrorMessage name="description" component={Error} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="price">Prix :</label>
                        <Field
                            as={FieldInput}
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Enter the price"
                            pattern="[0-9]*"
                            value={values.price ?? ''}
                        />
                        <ErrorMessage name="price" component={Error} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="stock">Stock :</label>
                        <Field
                            as={FieldInput}
                            type="number"
                            id="stock"
                            name="stock"
                            pattern="[0-9]*"
                        />
                        <ErrorMessage name="stock" component={Error} />
                    </FormGroup>
                    <PrimaryInput type="submit" value="Submit" isLoading={props.isPending} />
                </Form>
            )}
        </Formik>
    );
}



const FormGroup = styled.div`
    margin-bottom: 1rem;
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
`;

const Error = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
`;

const FieldInput = styled.input`
    width: calc(100% - 1rem);
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const FieldSelect = styled.select`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
`;

const FieldArea = styled.textarea`
    width: calc(100% - 1rem);
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const FileInputContainer = styled.div`
    position: relative;
    width: 100%;
`;

const ImagePreviewContainer = styled.div`
    position: relative;
    width: fit-content;
`;

const ClearImageButton = styled(BiTrash)`
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    color: red;
    cursor: pointer;
    padding: 1rem;
    width: 1.5rem;
    height: 1.5rem;
`;

const SelectedImagePreview = styled.div`
    margin-top: 1rem;
    img {
        max-width: 100%;
        height: auto;
    }
`;