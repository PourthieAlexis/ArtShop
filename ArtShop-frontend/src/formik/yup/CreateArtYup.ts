import * as Yup from "yup";

const CreateArtYup = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    price: Yup.number().typeError("Le prix doit être un nombre").required("Le prix est requis"),
    description: Yup.string().required("La description est requise"),
    image: Yup.mixed().required("L'image est requise"),
    stock: Yup.number().typeError("Le stock doit être un nombre").required("Le stock est requis"),
    category: Yup.string().required("La catégorie est requise"),
});

export default CreateArtYup;
