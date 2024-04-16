export interface CreateArt {
    title: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    category: string;
}

const CreateArtInitialValues: CreateArt = {
    title: "",
    price: 0,
    description: "",
    image: "",
    stock: 1,
    category: "",
};

export default CreateArtInitialValues;
