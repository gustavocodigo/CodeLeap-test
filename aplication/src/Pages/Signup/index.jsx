
import style from "./styles.module.css"

import store from "../../store"
import { useEffect, useState } from "react"



function Signup() {


    const [name, setName] = useState("")




    function setUserClickHandler() {
        localStorage.setItem('user', name);
        store.dispatch({ type: "SET_USER", payload: { user: name } })
    }
    useEffect(() => {
        let user = localStorage.getItem('user');
        if (user) {
            store.dispatch({ type: "SET_USER", payload: { user: user } })
        }
    }, [])



    return <div className={style["outer-component"]}>
        <div className={style["signup-component"]}>
            <div>
                <strong className={style["title"]} >Welcome to CodeLeap network!</strong>
                <small className={style["msg"]}>Please enter your username</small>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                {name.length<1 && 
                 <button onClick={setUserClickHandler} className="button-to-right" style={{backgroundColor: "gray", pointerEvents:"none"}}>Enter</button>
                ||
                <button onClick={setUserClickHandler} className="button-to-right">Enter</button>
                }
               
            </div>
        </div>
    </div>
}

export default Signup


