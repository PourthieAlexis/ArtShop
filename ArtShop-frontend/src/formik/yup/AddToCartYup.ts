import * as Yup from "yup";

const AddToCartYup = Yup.object().shape({
    quantity: Yup.number().required("La quantité est obligatoire"),
});


export default AddToCartYup;