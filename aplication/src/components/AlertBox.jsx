/* eslint-disable react/prop-types */

import styles from "./AlertBox.module.css"






function AlertBox(props) {
    return <div className={styles["alert-box-card-outer"]}>
        <div className={styles["alex-box-card"]}>
            <h2>{props.message}</h2> 
            <div>
                {props.children}
            </div>
        </div>
    </div>
}



export default AlertBox