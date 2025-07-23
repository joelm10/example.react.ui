import './styles/styles.css';
import LinkedInHeader from './components/LinkedInHeader';
import LinkedInSidebar from './components/LinkedInSidebar';
import LinkedInFeed from './components/LinkedInFeed';
import LinkedInRightSidebar from './components/LinkedInRightSidebar';


/**
 * Renders a LinkedIn layout component that mimics the structure of a LinkedIn page.
 * 
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS class name(s) to apply to the component
 * @param {Object} props.user - User data object containing profile information
 * @returns {JSX.Element} A LinkedIn layout with header, main content area with sidebar, feed, and right sidebar
 */
const LinkedInLayout = (props) => {
    const { className, user } = props;

    return (
        <div className={`linkedin-layout ${className || ''}`}>
            <LinkedInHeader user={user} />
            <div className="linkedin-main-content">
                <LinkedInSidebar user={user} />
                <LinkedInFeed />
                <LinkedInRightSidebar />
            </div>
        </div>
    );
};


export default LinkedInLayout;