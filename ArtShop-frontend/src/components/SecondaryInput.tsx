import React from 'react';
import styled from 'styled-components';

interface InputProps {
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    style?: object;
    placeholder?: string;
}

const SecondaryInput: React.FC<InputProps> = ({ type = "text", onChange, value, style, placeholder }) => {
    return (
        <StyledInput
            type={type}
            onChange={onChange}
            value={value}
            style={style}
            placeholder={placeholder}
        />
    );
};

const StyledInput = styled.input`
    height: 3.5rem;
    background-color: #E3E8F2;
    color: #141C24;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    ::placeholder {
        color: #9CA3AF;
    }
`;

export default SecondaryInput;
