import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

interface LoadingIndicatorProps {
    isLoading: boolean;
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
    return (
        <Loading>
            {props.isLoading && (
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
            )}
        </Loading>
    );
};

const Loading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default LoadingIndicator;
