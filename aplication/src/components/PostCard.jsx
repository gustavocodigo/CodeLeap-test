/* eslint-disable react/prop-types */

import { useEffect, useRef } from 'react';
import styles from "./PostCard.module.css";
import store from '../store';






function PostCard(props) {
    function onRemoveCardClick() {
       console.log(props.obj_id)
        store.dispatch({type:"SHOW_DELETE_ALERT", payload:{id: props.obj_id}})
    }

    function onEditCardClick() {
        console.log(props.obj_id)
        store.dispatch({type:"SHOW_EDIT_ALERT", payload:{id: props.obj_id}})
        
     }



    const targetRef = useRef(null);

    useEffect(() => {
        const handleIntersection = (entries) => {

            try{
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        targetRef.current.classList.add(styles["coming-card"]);
                    } else {
                        targetRef.current.classList.remove(styles["coming-card"]);
                    }
                });
            }catch(e){
                console.log("item remotion")
            }
          
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
                        <svg onClick={onRemoveCardClick} width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles["postcard-icon"]}>
                            <path d="M7.80087 23.75C7.80087 25.125 8.971 26.25 10.4011 26.25H20.8023C22.2324 26.25 23.4025 25.125 23.4025 23.75V8.75H7.80087V23.75ZM10.9992 14.85L12.8324 13.0875L15.6017 15.7375L18.358 13.0875L20.1912 14.85L17.4349 17.5L20.1912 20.15L18.358 21.9125L15.6017 19.2625L12.8454 21.9125L11.0122 20.15L13.7685 17.5L10.9992 14.85ZM20.1522 5L18.852 3.75H12.3514L11.0512 5H6.50073V7.5H24.7027V5H20.1522Z" fill="white" />
                        </svg>
                        <svg onClick={onEditCardClick} width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles["postcard-icon"]}>
                            <path d="M9.10095 21.2663L14.8385 21.2475L27.3614 9.3225C27.8528 8.85 28.1233 8.2225 28.1233 7.555C28.1233 6.8875 27.8528 6.26 27.3614 5.7875L25.2994 3.805C24.3165 2.86 22.6016 2.865 21.6265 3.80125L9.10095 15.7288V21.2663ZM23.461 5.5725L25.5269 7.55125L23.4506 9.52875L21.3886 7.5475L23.461 5.5725ZM11.7012 16.7713L19.5411 9.305L21.6031 11.2875L13.7645 18.7513L11.7012 18.7575V16.7713Z" fill="white" />
                            <path d="M6.50067 26.25H24.7026C26.1367 26.25 27.3029 25.1287 27.3029 23.75V12.915L24.7026 15.415V23.75H10.6065C10.5727 23.75 10.5376 23.7625 10.5038 23.7625C10.4609 23.7625 10.418 23.7512 10.3738 23.75H6.50067V6.25H15.4027L18.003 3.75H6.50067C5.06661 3.75 3.90039 4.87125 3.90039 6.25V23.75C3.90039 25.1287 5.06661 26.25 6.50067 26.25Z" fill="white" />
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
