export interface Comment {
    message: string;
    art_id: number | null;
}

const CommentInitialValues: Comment = {
    message: "",
    art_id: null
};

export default CommentInitialValues;
