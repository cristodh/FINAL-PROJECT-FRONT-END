import React from "react";
import "../../styles/Student/ColorsStudent.css";
import "../../styles/Student/PostCard.css";

function PostCard({ post }) {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Hace 1 día";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays/7)} semanas`;
    return formatDate(dateString);
  };

  if (!post) {
    return (
      <div className="publicacion-card placeholder">
        <h4>Cargando...</h4>
      </div>
    );
  }

  return (
    <div className="publicacion-card">
      <div className="post-header">
        <div className="post-topic">
          <span className="topic-tag">{post.topic || "General"}</span>
        </div>
        <div className="post-time">
          <span className="time-ago">{getTimeAgo(post.date)}</span>
        </div>
      </div>
      
      <div className="post-content">
        <h4 className="post-title">{post.title}</h4>
        <p className="post-description">{post.description}</p>
      </div>
      
      <div className="post-footer">
        <div className="post-author">
          <span className="author-icon">👤</span>
          <span className="author-name">{post.userName}</span>
        </div>
        <div className="post-actions">
          <button className="like-btn">
            <span>👍</span>
          </button>
          <button className="comment-btn">
            <span>💬</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;