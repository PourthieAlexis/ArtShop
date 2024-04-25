import styled from 'styled-components';
import CardArtWork from '../CardArtWork';
import { ThreeDots } from 'react-loader-spinner';
import SecondaryInput from '../SecondaryInput';
import React from 'react';

interface Artwork {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    users: {
        id: number;
        email: string;
        address: string;
        name: string;
        profilePicture: string;
    };
    categories: {
        id: number;
        name: string;
    };
}

interface IListArtsProps {
    pages: Array<{
        data: {
            art: Array<Artwork>;
            pagination: {
                currentPage: number;
                itemsPerPage: number;
                nextPage: number;
                totalItems: number;
                totalPages: number;
            };
        }
    }> | undefined;
    isLoading: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    showMore: () => void;
}

export default function ListArts(props: IListArtsProps) {
    return (
        <ListArtsContainer>
            {props.isLoading ? (
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#9CA3AF"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            ) : (
                <>
                    {props.pages &&
                        props.pages.map((page, index) => (
                            <React.Fragment key={index}>
                                {page.data.art.map((art: Artwork) => (
                                    <CardArtWork
                                        id={art.id}
                                        title={art.title}
                                        category={art.categories.name}
                                        price={art.price}
                                        image={`http://localhost:8000/uploads/images/${art.image}`}
                                        key={art.id}
                                    />
                                ))}
                            </React.Fragment>
                        ))}

                    {props.hasNextPage &&
                        <SecondaryInput
                            type="button"
                            value="Montrer plus"
                            style={{
                                width: '8rem',
                                height: '3rem',
                                position: 'absolute',
                                bottom: '0',
                                margin: '-1rem 0',
                            }}
                            isLoading={props.isFetchingNextPage}
                            onClick={() => props.showMore()}
                        />}

                </>
            )}
        </ListArtsContainer>
    );
}

const ListArtsContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
    justify-content: space-around;
`;
