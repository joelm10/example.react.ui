const ErrorComponent = (props) => {
    const { errorPage } = props;
    // TODO: extract the error context and page from props;
    // need to ensure params are passed in error handler from react-router-com
    console.log('props', props);

    const errMessage = `An error has occured, cant find page ${errorPage}`;
    const errComponent = (<div>{errMessage}</div>);
    return errComponent;
};

export default ErrorComponent;