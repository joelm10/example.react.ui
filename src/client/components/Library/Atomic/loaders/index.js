const LoadingWrapper = (props) => {
    const { isLoading = true, label = 'Loading...' } = props;

    return isLoading && (
        <div className="d-flex justify-content-center loader-wrapper">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">{label}</span>
            </div>
        </div>
    );
};

export default LoadingWrapper;