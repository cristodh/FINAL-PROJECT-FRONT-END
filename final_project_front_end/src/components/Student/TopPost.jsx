import React from "react";
import "../../styles/Student/ColorsStudent.css"
import PostCard from "../Student/PostCard";
import "../../styles/Student/TopPost.css";

function TopPost() {
  return (
    <section className="top-publicaciones">
      <h3>TOP publicaciones</h3>
      <div className="publicaciones-grid">
        {Array(6).fill(null).map((_, i) => (
          <PostCard key={i} />
        ))}
      </div>
    </section>
  );
}

export default TopPost;