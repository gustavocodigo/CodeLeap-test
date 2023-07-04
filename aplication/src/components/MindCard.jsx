

import { useState } from "react"
import styles from "./MindCard.module.css"






function MindCard() {

    const [contextText, setContentText] = useState("")
    const [titleText, setTitleText] = useState("")
    function handleTextContent(text) {
        setContentText(text.target.value)
    }
    function handleTitleContent(text) {
        setTitleText(text.target.value)
    }


    return <div className={styles["mind-card"]}>
        <strong>Whats your mind?</strong><br></br>
        <small>
            Title
        </small>
        <input placeholder="Hello world" type="text" onChange={handleTitleContent}/>
        <small className={styles["content-el"]}>
            Content
        </small>

        <textarea placeholder="Content here" className={styles["content-input"]} type="text" onChange={handleTextContent} />

        {(contextText !== "" && titleText !== "") ? (
            <button className="button-to-right">Create</button>
        ) : (
            <button className="button-to-right" style={{backgroundColor: "gray", pointerEvents:"none"}}>Create</button>
        )}




    </div>
}


export default MindCard