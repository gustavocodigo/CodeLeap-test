
import "./styles.css"


function Signup() {
    return <div className="outer-component">
    <div className="signup-component">
        <div>
            <strong id="title">Welcome to CodeLeap network!</strong>
            <small id="msg">Please enter your username</small>
            <input type="text"/>
            <button className="button-to-right">Enter</button>
        </div>
    </div>
    </div>
}

export default Signup