

import styles from "./MindCard.module.css"

function MindCard() {
    return <div className={styles["mind-card"]}>
       <strong>Whats your mind?</strong><br></br>
       <small>
        Title
       </small>
       <input  type="text" />
       <small>
        Content
       </small>
       <textarea className={styles["content-input"]} type="text" />
       <button className="button-to-right">
       Create
       </button>
    </div>
}


export default MindCard