const LoadingWrapper = (props) => {
    const { isLoading = true, label = 'Loading...' } = props;

    return isLoading && (
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">{label}</span>
            </div>
        </div>
    );
};

export default LoadingWrapper;