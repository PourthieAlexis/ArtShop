import React, { forwardRef, Ref } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isLoading?: boolean;
}

const SecondaryInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { isLoading, value, style, ...rest } = props;

    return (
        <StyledInputContainer style={style}>
            <StyledInput
                value={isLoading ? '' : value}
                {...rest}
                ref={ref}
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
});
const StyledInputContainer = styled.div`
  position: relative;
  height: 3.5rem;
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
  height: 100%;
`;

const StyledInput = styled.input`
    height: 100%;
    width: 100%;
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
