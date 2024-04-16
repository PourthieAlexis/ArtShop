import * as Yup from "yup";

const CreateArtYup = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    price: Yup.number().required("Le prix est requis"),
    description: Yup.string().required("La description est requise"),
    image: Yup.string().required("L'image est requise"),
    stock: Yup.number().required("Le stock est requis"),
    category: Yup.string().required("La categorie est requis"),
});


export default CreateArtYup;