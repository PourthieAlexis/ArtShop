import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getArt } from "../api/backend/art";
import ListArts from "../components/accueil/ListArts";
import SearchBar from "../components/accueil/SearchBar";
import { useState } from "react";
import { useScrollDetection } from "../components/accueil/useScrollDetection";
import { calculateTotalItems } from "../utils/fnUtils";

export default function AccueilView() {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['arts', { searchTerm }],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => getArt({ pageParam, searchTerm }),
        getNextPageParam: (lastPage) => lastPage.data.pagination.nextPage,
    });

    const handleSearch = (term: string) => setSearchTerm(term);

    const isScrolled = useScrollDetection(150);

    const totalItems = calculateTotalItems(data?.pages);
    const lastPageTotalItems = data?.pages[data?.pages?.length - 1]?.data.pagination.totalItems ?? 0;

    return (
        <AccueilContainer>
            <BannerContainer $isScrolled={isScrolled}>
                <SearchBar onSearch={handleSearch} />
            </BannerContainer>
            <AccueilContent $isScrolled={isScrolled}>
                <ProductTitle>Products</ProductTitle>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                <ShowMoreContainer>
                    <Text>Showing {totalItems} of {lastPageTotalItems}</Text>
                </ShowMoreContainer>
                <ListArts
                    pages={data?.pages}
                    isLoading={isLoading}
                    showMore={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </AccueilContent>
        </AccueilContainer>
    );
}
const AccueilContainer = styled.section`
    height: auto;
    position: relative;
`;

const ShowMoreContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 2rem;
    margin-top:1rem
`

const BannerContainer = styled.div<{ $isScrolled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${props => props.$isScrolled ? '5rem' : "20rem"};
    position: ${props => props.$isScrolled ? 'fixed' : "relative"};
    top: 0;
    width: 100vw;
    background-image: url('/images/banner.webp');
    background-size: cover;
    transition: height 0.5s ease;
    z-index: 999;
`

const ProductTitle = styled.h1`

`

const Text = styled.p`
    font-size: 12px;
    margin: 0;
`

const AccueilContent = styled.div<{ $isScrolled?: boolean }>`
    margin-top: ${props => (props.$isScrolled ? '15rem' : '1rem')};
    padding: 0 4rem 0 4rem;
`