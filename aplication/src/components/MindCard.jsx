

import { useState } from "react"
import styles from "./MindCard.module.css"

import store from "../store";



function MindCard() {

    const [contextText, setContentText] = useState("")
    const [titleText, setTitleText] = useState("")

    function handleTextContent(text) {
        setContentText(text.target.value)
    }
    function handleTitleContent(text) {
        setTitleText(text.target.value)
    }

    function send_post_handle_click() {
        store.dispatch({ type: "SEND_NEW_POST", payload: {
            title: titleText,
            content: contextText
        } })
        store.dispatch({ type: "LOAD_POSTS" })
        setTitleText("")
        setContentText("")
    }
    


    return <div className={styles["mind-card"]}>
        <strong>Whats your mind?</strong><br></br>
        <small>
            Title
        </small>
        <input value={titleText} placeholder="Hello world" type="text" onChange={handleTitleContent}/>
        <small className={styles["content-el"]}>
            Content
        </small>

        <textarea value={contextText} placeholder="Content here" className={styles["content-input"]} type="text" onChange={handleTextContent} />

        {(contextText !== "" && titleText !== "") ? (
            <button className="button-to-right" onClick={send_post_handle_click}>Create</button>
        ) : (
            <button className="button-to-right" style={{backgroundColor: "gray", pointerEvents:"none"}}>Create</button>
        )}




    </div>
}


export default MindCard