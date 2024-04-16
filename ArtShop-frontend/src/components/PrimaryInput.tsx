import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

interface InputProps {
    isLoading?: boolean;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    className?: string;
    placeholder?: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const PrimaryInput: React.FC<InputProps> = ({ isLoading, type = "text", onChange, value, className, placeholder, onClick }) => {
    return (
        <StyledInputContainer>
            <StyledInput
                type={type}
                onChange={onChange}
                value={isLoading ? '' : value}
                className={className}
                placeholder={placeholder}
                onClick={onClick}
            />
            {isLoading && (
                <LoadingIndicator>
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
                </LoadingIndicator>
            )}
        </StyledInputContainer>

    );
};

const StyledInputContainer = styled.div`
  position: relative;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
    position: relative;
    height: 3.5rem;
    background-color: #F5C754;
    width: 100%;
    color: #141C24;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
`;

export default PrimaryInput;
