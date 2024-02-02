import * as Yup from "yup";

const LoginYup = Yup.object().shape({
    name: Yup.string().required("Le nom est obligatoire"),
    email: Yup.string()
        .email("L'email n'est pas valide")
        .required("L'email est obligatoire"),
    password: Yup.string()
        .required("Le mot de passe est obligatoire"),
});


export default LoginYup;