import React, { useState, useEffect } from "react";
import "../../styles/Student/ColorsStudent.css"
import "../../styles/Student/NewsStudent.css";


const images = [
  { src: "/assets/news/news1.png", alt: "Noticia 1" },
  { src: "/assets/news/news2.png", alt: "Noticia 2" },
  { src: "/assets/news/news3.png", alt: "Noticia 3" },
];

function NewsStudent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="noticias">
      <div className="carousel">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className={`slide ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsStudent;
