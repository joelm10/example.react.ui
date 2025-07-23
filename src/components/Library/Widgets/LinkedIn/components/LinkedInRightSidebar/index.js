import '../../styles/LinkedInRightSidebar.css'; // Ensure you have this CSS file for styling

/**
 * LinkedInRightSidebar Component
 * 
 * A component that renders the right sidebar of a LinkedIn-like interface.
 * Contains three main sections:
 * 1. LinkedIn News - Displays current news items with titles, timestamps, and reader counts
 * 2. Most Viewed Courses - Shows ranked courses with titles and instructors
 * 3. Footer Section - Contains navigation links
 * 
 * @component
 * @returns {JSX.Element} A div containing the LinkedIn right sidebar structure
 * 
 * @example
 * return (
 *   <LinkedInRightSidebar />
 * )
 */
const LinkedInRightSidebar = () => {
    return (
        <div className="linkedin-sidebar right">
            <div className="sidebar-card news-section">
                <h2>LinkedIn News</h2>
                <ul className="news-list">
                    <li className="news-item">
                        <span className="news-bullet">•</span>
                        <div>
                            <p className="news-title">Top tech jobs for 2023</p>
                            <p className="news-meta">2d ago • 4,568 readers</p>
                        </div>
                    </li>
                    <li className="news-item">
                        <span className="news-bullet">•</span>
                        <div>
                            <p className="news-title">Remote work trends shifting</p>
                            <p className="news-meta">3d ago • 2,112 readers</p>
                        </div>
                    </li>
                    <li className="news-item">
                        <span className="news-bullet">•</span>
                        <div>
                            <p className="news-title">AI tools transforming work</p>
                            <p className="news-meta">1d ago • 5,236 readers</p>
                        </div>
                    </li>
                </ul>
                <button className="show-more">Show more</button>
            </div>

            <div className="sidebar-card courses-section">
                <h2>Today's most viewed courses</h2>
                <ul className="course-list">
                    <li className="course-item">
                        <span className="course-number">1.</span>
                        <div>
                            <p className="course-title">Python for Data Science</p>
                            <p className="course-meta">John Doe</p>
                        </div>
                    </li>
                    <li className="course-item">
                        <span className="course-number">2.</span>
                        <div>
                            <p className="course-title">JavaScript Essentials</p>
                            <p className="course-meta">Jane Smith</p>
                        </div>
                    </li>
                    <li className="course-item">
                        <span className="course-number">3.</span>
                        <div>
                            <p className="course-title">Leadership in Tech</p>
                            <p className="course-meta">Robert Johnson</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="sidebar-card footer-section">
                <div className="footer-links">
                    <a href="https://example.com#about">About</a>   
                    <a href="https://example.com#help">Help</a>
                    <a href="https://example.com#privacy">Privacy</a>
                    <a href="https://example.com#terms">Terms</a>
                    <a href="https://example.com#contact">Contact</a>
                </div>
            </div>
        </div>
    );
};

export default LinkedInRightSidebar;