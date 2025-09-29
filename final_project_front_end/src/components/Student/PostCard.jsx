import React from "react";
import "../../styles/Student/ColorsStudent.css"
import "../../styles/Student/PostCard.css";

function PostCard({ tema, fecha, publica }) {
  return (
    <div className="publicacion-card">
      <h4>{tema || "?"}</h4>
      <p>Publica: {publica || "?"}</p>
      <p>Fecha: {fecha || "?"}</p>
    </div>
  );
}

export default PostCard;