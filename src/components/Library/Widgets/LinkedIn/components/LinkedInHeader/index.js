/**
 * A component that renders a header for LinkedIn display.
 * The header consists of a title "LinkedIn Header" and a welcome message.
 * 
 * @returns {JSX.Element} A div containing the LinkedIn header with title and welcome message
 */
const LinkedInHeader = () => {
    const header = (
        <div className="linkedin-header">
            <h1>LinkedIn Header</h1>
            <p>Welcome to LinkedIn</p>
        </div>
    );
    return header;
};

export default LinkedInHeader;