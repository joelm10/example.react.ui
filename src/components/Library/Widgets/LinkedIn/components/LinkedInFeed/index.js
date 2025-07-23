import { useState, useEffect } from 'react';
import '../../styles/LinkedInFeed.css';

// interface Post {
//     id: number;
//     author: string;
//     position: string;
//     content: string;
//     likes: number;
//     comments: number;
//     timestamp: string;
//     profilePic: string;
// }
const mockPosts = [
    {
        id: 1,
        author: 'Jane Doe',
        position: 'Software Engineer at Tech Co',
        content: 'Excited to share that I just completed my latest project!',
        likes: 42,
        comments: 7,
        timestamp: '2h ago',
        profilePic: 'https://via.placeholder.com/50',
    },
    {
        id: 2,
        author: 'John Smith',
        position: 'Product Manager',
        content: 'Just published a new article on product management best practices. Link in comments!',
        likes: 23,
        comments: 5,
        timestamp: '4h ago',
        profilePic: 'https://via.placeholder.com/50',
    },
    {
        id: 3,
        author: 'Sarah Johnson',
        position: 'UX Designer',
        content: 'Looking for recommendations on the best design tools for 2023. What is everyone using these days?',
        likes: 15,
        comments: 12,
        timestamp: '6h ago',
        profilePic: 'https://via.placeholder.com/50',
    },
];

const LinkedInFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState('');

    // Sample data - in a real app, this would come from an API
    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setPosts(mockPosts);
            setLoading(false);
        }, 1000);
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        const post = {
            id: Date.now(),
            author: 'Current User',
            position: 'Your Position',
            content: newPost,
            likes: 0,
            comments: 0,
            timestamp: 'Just now',
            profilePic: 'https://via.placeholder.com/50',
        };

        setPosts([post, ...posts]);
        setNewPost('');
    };

    const handleLike = (id) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    return (
        <div className="linkedin-feed">
            <div className="post-form-container">
                <form onSubmit={handlePostSubmit}>
                    <img src="https://via.placeholder.com/40" alt="Your profile" className="user-pic" />
                    <input
                        type="text"
                        placeholder="Start a post"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                    <button type="submit">Post</button>
                </form>
            </div>

            {loading ? (
                <div className="loading">Loading feed...</div>
            ) : (
                <div className="posts-container">
                    {posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="post-header">
                                <img src={post.profilePic} alt={post.author} className="profile-pic" />
                                <div className="post-info">
                                    <h4>{post.author}</h4>
                                    <p className="position">{post.position}</p>
                                    <p className="timestamp">{post.timestamp}</p>
                                </div>
                            </div>
                            <div className="post-content">
                                <p>{post.content}</p>
                            </div>
                            <div className="post-actions">
                                <button onClick={() => handleLike(post.id)}>
                                    <span className="like-icon">👍</span> {post.likes}
                                </button>
                                <button>
                                    <span className="comment-icon">💬</span> {post.comments}
                                </button>
                                <button>
                                    <span className="share-icon">↗️</span> Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LinkedInFeed;