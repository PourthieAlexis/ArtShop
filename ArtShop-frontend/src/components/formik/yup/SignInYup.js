import * as Yup from "yup";

const LoginYup = Yup.object().shape({
    email: Yup.string()
        .email("L'email n'est pas valide")
        .required("L'email est obligatoire"),
    password: Yup.string()
        .required("Le mot de passe est obligatoire"),
});


export default LoginYup;