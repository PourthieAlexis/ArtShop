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
    height: calc(100vh - 5rem);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default LoadingIndicator;
