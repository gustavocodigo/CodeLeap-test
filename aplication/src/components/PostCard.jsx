import React, { useEffect, useRef } from 'react';
import styles from "./PostCard.module.css";

function PostCard(props) {
  const targetRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          targetRef.current.classList.add(styles["coming-card"]);
        }else {
            targetRef.current.classList.remove(styles["coming-card"]);
          }
      });
    };

    const options = {
      root: null, // O viewport do navegador
      rootMargin: '0px', // Margem aplicada ao viewport
      threshold: 0, // Porcentagem de interseção necessária para disparar a callback
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div ref={targetRef} className={styles["post-card"]}>
      <header className={styles["component-header"]}>
        <h1 className={styles["post-card-title"]}>{props.title}</h1>
        {props.editable && (
          <div className={styles["postcard-edit-icons-container"]}>
            <svg
              width="32"
              height="30"
              viewBox="0 0 32 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["postcard-icon"]}
            >
              {/* Ícone 1 */}
            </svg>
            <svg
              width="32"
              height="30"
              viewBox="0 0 32 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["postcard-icon"]}
            >
              {/* Ícone 2 */}
            </svg>
          </div>
        )}
      </header>
      <div className={styles["username-and-time-component"]}>
        <p>@{props.username}</p>
        <p>{props.date}</p>
      </div>
      <div className="component-content">
        <p className={styles["message"]}>{props.message}</p>
      </div>
    </div>
  );
}

export default PostCard;
