export interface CreateArt {
    title: string;
    price: number | null;
    description: string;
    image: File | null;
    stock: number;
    category: string;
}

const CreateArtInitialValues: CreateArt = {
    title: "",
    price: null,
    description: "",
    image: null,
    stock: 1,
    category: "",
};

export default CreateArtInitialValues;