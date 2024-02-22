import React from 'react';
import styled from 'styled-components';

const NumberInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return <StyledInput type="number" {...props} />;
};

const StyledInput = styled.input`
    appearance: textfield;
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 3rem;
    background-color: #E3E8F2;
`;

export default NumberInput;
