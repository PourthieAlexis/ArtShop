import React from 'react';
import styled from 'styled-components';

interface InputProps {
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    className?: string;
    placeholder?: string;
}

const PrimaryInput: React.FC<InputProps> = ({ type = "text", onChange, value, className, placeholder }) => {
    return (
        <StyledInput
            type={type}
            onChange={onChange}
            value={value}
            className={className}
            placeholder={placeholder}
        />
    );
};

const StyledInput = styled.input`
    height: 3.5rem;
    background-color: #F5C754;
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

export default PrimaryInput;
