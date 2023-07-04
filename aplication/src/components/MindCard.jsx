

import "./MindCard.css"

function MindCard() {
    return <div className="mind-card">
       <strong>Whats your mind?</strong><br></br>
       <small>
        Title
       </small>
       <input  type="text" />
       <small>
        Content
       </small>
       <textarea id="content-input" type="text" />
       <button className="button-to-right">
       Create
       </button>
    </div>
}


export default MindCard