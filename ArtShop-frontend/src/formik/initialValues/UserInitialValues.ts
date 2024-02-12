export interface User {
    name: string;
    email: string;
    password: string;
    address: string;
}

const UserInitialValues: User = {
    name: "",
    email: "",
    password: "",
    address: "",
};

export default UserInitialValues;
