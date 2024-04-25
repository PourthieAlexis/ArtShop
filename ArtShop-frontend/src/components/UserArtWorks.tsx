import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArtByUUID } from "../api/backend/art";
import { toast } from "react-toastify";
import { selectToken } from "../reducers/authenticationSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface Artwork {
    id: string;
    title: string;
    image: string;
}

interface UserArtworksProps {
    artworks: Artwork[];
}

export default function UserArtworks(props: UserArtworksProps) {
    const token = useSelector(selectToken);
    const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (values: any) => deleteArtByUUID(values, token),
        onSuccess: () => {
            toast.success("L'oeuvre a été supprimé ", {
                position: "bottom-right"
            });
        },
        onError: (context: any) => {
            queryClient.setQueryData(['UserProfil'], context.previousProfil)
            toast.error('Une erreur est survenue', {
                position: "bottom-right"
            });
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['UserProfil'] })
        },
        onMutate: async (deletedArtworkId) => {
            await queryClient.cancelQueries({ queryKey: ['UserProfil'] })

            const previousProfil = queryClient.getQueryData(['UserProfil'])

            queryClient.setQueryData(['UserProfil'], (oldData: any) => ({
                data: {
                    ...oldData.data,
                    arts: oldData.data.arts.filter((artwork: any) => artwork.id !== deletedArtworkId)
                },
            }));

            return { previousProfil }
        },
    });

    const onSubmit = (uuid: string) => {
        setShowConfirmation(uuid);
    }

    const handleConfirmation = (uuid: string) => {
        mutate(uuid);
        setShowConfirmation(null);
    }

    return (
        <>
            {props.artworks.length === 0
                ? <NoArtworkContainer>
                    <NoArtworkMessage>
                        Vous n'avez pas d'œuvre d'art en vente.
                    </NoArtworkMessage>
                </NoArtworkContainer>
                : <Container>
                    <Title>Oeuvres d'arts de l'artiste</Title>
                    <ArtworkList>
                        {props.artworks.map((artwork) => (
                            <ArtworkItem key={artwork.id}>
                                <ArtWorksGroup>
                                    <ArtworkImage src={`http://localhost:8000/uploads/images/${artwork.image}`} alt={artwork.title} />
                                    <ArtworkTitle>{artwork.title}</ArtworkTitle>
                                </ArtWorksGroup>
                                <ButtonGroup>
                                    <DeleteIcon onClick={() => onSubmit(artwork.id)} />
                                </ButtonGroup>
                            </ArtworkItem>
                        ))}
                    </ArtworkList>
                </Container>
            }
            {showConfirmation !== null && (
                <ConfirmationModal
                    message="Êtes-vous sûr de vouloir supprimer cette œuvre d'art ?"
                    onCancel={() => setShowConfirmation(null)}
                    onConfirm={() => handleConfirmation(showConfirmation)}
                />
            )}
        </>
    );
};

const Container = styled.div`
    width: 100%;
    height: 40%;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid black;
`

const Title = styled.h3`
    color: #384D6C;
`;

const ArtworkList = styled.ul`
    list-style: none;
    padding: 0;
    
`;

const ArtworkItem = styled.li`
    height: 8rem;
    display: flex;
    align-items:center;
    justify-content: space-between;
    padding: 1rem;
`;

const ArtworkImage = styled.img`
    object-fit: contain;
    width: 5rem;
    height: 7rem;
`;

const ArtWorksGroup = styled.div`
    display: flex;
    align-items:center;
    gap:1rem;
`

const ButtonGroup = styled.div`
    display: flex;
    gap:1rem;
`;

const DeleteIcon = styled(BiTrash)`
    height: 2rem;
    width: 2rem;
    color: red;
    cursor: pointer;
`;

const ArtworkTitle = styled.p`

`;

const NoArtworkMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 18px;
`;

const NoArtworkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

