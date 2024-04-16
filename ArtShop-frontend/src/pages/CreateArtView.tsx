import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PrimaryInput from "../components/PrimaryInput";
import CreateArtYup from "../formik/yup/CreateArtYup";
import CreateArtInitialValues from "../formik/initialValues/CreateArtInitialValues";
import { useMutation } from "@tanstack/react-query";
import { createArt } from "../api/backend/art";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectToken } from "../reducers/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "../constants/urls/urlFrontend";

const CreateArtView = () => {
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (formData: FormData) => createArt(formData, token),
        onSuccess: () => {
            navigate(URL_HOME);
            toast.success("Art created !", {
                position: "bottom-right"
            });
        },
        onError: () => {
            toast.error("Une erreur est survenu !", {
                position: "bottom-right"
            });
        },
    });

    const onSubmit = (values: any) => {
        mutate(values);
    };

    return (
        <CreateArtContainer>
            <h2>Add ArtWorks</h2>
            <Formik
                initialValues={CreateArtInitialValues}
                validationSchema={CreateArtYup}
                onSubmit={onSubmit}
            >
                {({ setFieldValue }) => (
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <label htmlFor="title">Title :</label>
                            <Field as={FieldInput} type="text" id="title" name="title" />
                            <ErrorMessage name="title" component={Error} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="category">Category :</label>
                            <Field as={FieldInput} type="text" id="category" name="category" />
                            <ErrorMessage name="category" component={Error} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="image">Image :</label>
                            <FieldInput type="file" id="image" name="image" onChange={(event) => {
                                const files = event.currentTarget.files;
                                setFieldValue("image", files?.[0]);
                            }} />
                            <ErrorMessage name="image" component={Error} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="description">Description :</label>
                            <Field as={FieldArea} id="description" name="description" rows="5" cols="33" />
                            <ErrorMessage name="description" component={Error} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="price">Price :</label>
                            <Field as={FieldInput} type="text" id="price" name="price" />
                            <ErrorMessage name="price" component={Error} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="stock">Stock :</label>
                            <Field as={FieldInput} type="number" id="stock" name="stock" />
                            <ErrorMessage name="stock" component={Error} />
                        </FormGroup>
                        <PrimaryInput type='submit' value="Submit" isLoading={isPending} />
                    </Form>
                )}
            </Formik>
        </CreateArtContainer>
    );
};

const CreateArtContainer = styled.section`
  max-width: 30rem;
  margin: 0 auto;
`;

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
`

const FieldInput = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FieldArea = styled.textarea`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default CreateArtView;
