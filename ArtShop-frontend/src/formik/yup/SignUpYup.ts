import * as Yup from "yup";

const RegisterYup = Yup.object().shape({
    name: Yup.string().required("Le nom est obligatoire"),
    email: Yup.string()
        .email("L'email n'est pas valide")
        .required("L'email est obligatoire"),
    password: Yup.string()
        .required("Le mot de passe est obligatoire"),
    phone: Yup.string().required("Le numéro de téléphone est obligatoire"),
    address: Yup.string()
        .required("L'adresse est obligatoire"),
    artistName: Yup.string()
        .required("Veuillez choisir un nom d'ariste"),
});


export default RegisterYup;