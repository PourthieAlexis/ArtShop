import * as Yup from "yup";

const CommentYup = Yup.object().shape({
    message: Yup.string().required("Le message est obligatoire"),
});


export default CommentYup;