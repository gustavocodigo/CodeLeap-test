
import style from  "./styles.module.css"


function Signup() {
    return <div className={style["outer-component"]}>
    <div className={style["signup-component"]}>
        <div>
            <strong className={style["title"]} >Welcome to CodeLeap network!</strong>
            <small className={style["msg"]}>Please enter your username</small>
            <input type="text"/>
            <button className="button-to-right">Enter</button>
        </div>
    </div>
    </div>
}

export default Signup