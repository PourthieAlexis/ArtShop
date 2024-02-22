import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { FaChevronCircleDown } from "react-icons/fa";

interface DropdownProps {
    image: string
}

interface DropdownListProps {
    $isOpen: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ image }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <DropdownContainer>
            <DropdownButton onClick={toggleDropdown}>
                <ChevronIcon $isOpen={isOpen} />
            </DropdownButton>
            <DropdownList $isOpen={isOpen}>
                <MiniImage src={image} alt="placeholder" />
                <MiniImage src={image} alt="placeholder" />
                <MiniImage src={image} alt="placeholder" />
                <MiniImage src={image} alt="placeholder" />
            </DropdownList>
        </DropdownContainer>
    );
};

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-1rem);
        display: none;
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-1rem);
        display: none;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
    width: 100%;
`;

const DropdownButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    position: relative; 
    padding: 1rem;
    font-size: 1.5rem;
    &:before, &:after {
        content: '';
        position: relative;
        bottom: 0;
        height: 2px;
        width: calc(50% - 1rem);
        background-color: black;
    }
    &:before {
        right: 1rem;
    }
    &:after {   
        left: 1rem;
    }
`;

const ChevronIcon = styled(FaChevronCircleDown) <DropdownListProps> `
    font-size: 1.5rem;
    transition: transform 0.5s ease;
    ${(props) =>
        props.$isOpen &&
        css`
            transform: rotate(180deg);
        `}
`;

const DropdownList = styled.div <DropdownListProps> `
    display: flex;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    flex-wrap: wrap;
    gap: 1rem;
    animation: ${(props) => (props.$isOpen ? fadeIn : fadeOut)} 0.5s ease-in-out forwards;
`;

const MiniImage = styled.img`
    width: calc(50% - 0.5rem);
`;

export default Dropdown;
