import styled from "styled-components";
import PrimaryInput from "./PrimaryInput";

export interface IProfilInfoProps {
    email: string,
}

export default function ProfilInfo(props: IProfilInfoProps) {
    return (
        <Container>
            <Group>
                <label htmlFor="email">Email :</label>
                {props.email}
            </Group>
            <Group>
                <label htmlFor="password">Password :</label>
                <PrimaryInput value="Modify Password" type="button" />
            </Group>
        </Container>
    );
}


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 40%;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid black;
`

const Group = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;
    flex-basis: calc(50% - 1rem);
    gap: 1rem;
    label {
        display: block;
        font-weight: bold;
        color: #384D6C;
    }
`;
