import '../../styles/LinkedInSidebar.css';

const LinkedInSidebar = ({ profile }) => {
    return (
        <div className="linkedin-sidebar left">
            <div className="profile-card">
                <div className="profile-background"></div>
                <div className="profile-info">
                    <img 
                        src={profile?.avatarUrl || "https://placeholder.com/150"} 
                        alt="Profile" 
                        className="profile-avatar" 
                    />
                    <h2 className="profile-name">{profile?.name || "Your Name"}</h2>
                    <p className="profile-headline">{profile?.headline || "Your Headline"}</p>
                </div>
                <div className="profile-stats">
                    <div className="stat">
                        <span>Profile views</span>
                        <strong>{profile?.views || "0"}</strong>
                    </div>
                    <div className="stat">
                        <span>Post impressions</span>
                        <strong>{profile?.impressions || "0"}</strong>
                    </div>
                </div>
                <div className="premium-section">
                    <p>Access exclusive tools & insights</p>
                    <button type="button" className="premium-link">Try Premium for free</button>
                </div>
            </div>
            
            <div className="sidebar-section">
                <h3>Recent</h3>
                <ul className="sidebar-list">
                    {profile?.recent?.map((item, index) => (
                        <li key={index} className="sidebar-list-item">
                            <span className="sidebar-icon">#</span>
                            <span>{item}</span>
                        </li>
                    )) || (
                        <li className="sidebar-list-item">No recent items</li>
                    )}
                </ul>
            </div>
            
            <div className="sidebar-section">
                <h3>Groups</h3>
                <ul className="sidebar-list">
                    {profile?.groups?.map((group, index) => (
                        <li key={index} className="sidebar-list-item">
                            <span className="sidebar-icon">👥</span>
                            <span>{group}</span>
                        </li>
                    )) || (
                        <li className="sidebar-list-item">No groups joined</li>
                    )}
                </ul>
            </div>
            
            <div className="sidebar-section">
                <button type="button" className="discover-more">Discover more</button>
            </div>
        </div>
    );
};

export default LinkedInSidebar;