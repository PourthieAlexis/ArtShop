export interface User {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    artistName: string;
}

const UserInitialValues: User = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    artistName: "",
};

export default UserInitialValues;
