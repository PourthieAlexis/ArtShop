import * as Yup from "yup";

const ChangeProfilePictureYup = Yup.object().shape({
    picture: Yup.mixed().required('Une image est requise')
        .test('fileSize', "Le fichier est trop volumineux", (value: any) => {
            if (value && 'size' in value) {
                return value.size <= 5000000;
            }
            return true;
        })
        .test('fileType', "Le fichier doit être une image", (value: any) => {
            if (value && 'type' in value) {
                return value.type.startsWith('image/');
            }
            return true;
        })
})

export default ChangeProfilePictureYup;
