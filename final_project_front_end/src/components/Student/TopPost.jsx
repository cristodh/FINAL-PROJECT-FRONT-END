import React, { useState, useEffect } from "react";
import { getData } from "../../services/fetchs";
import "../../styles/Student/ColorsStudent.css";
import PostCard from "../Student/PostCard";
import "../../styles/Student/TopPost.css";

function TopPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getData("posts");
        // Ordenar por fecha más reciente y tomar solo las 6 más recientes
        const sortedPosts = allPosts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, []);

  if (loading) {
    return (
      <section className="top-publicaciones">
        <h3>TOP publicaciones</h3>
        <div className="loading-posts">
          <p>Cargando publicaciones...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="top-publicaciones">
      <h3>TOP publicaciones</h3>
      <div className="publicaciones-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post}
            />
          ))
        ) : (
          <div className="no-posts">
            <p>No hay publicaciones disponibles</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TopPost;