import * as Yup from "yup";

const EditProfilYup = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
    artistName: Yup.string().required('Artist name is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
});

export default EditProfilYup;
