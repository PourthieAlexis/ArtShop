import { ThreeDots } from 'react-loader-spinner';

interface LoadingIndicatorProps {
    isLoading: boolean;
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
    return (
        <div>
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
        </div>
    );
};

export default LoadingIndicator;