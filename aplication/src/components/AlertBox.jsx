

import "./AlertBox.css"

function AlertBox(props) {
    return <div className="alert-box-card-outer">
        <div className="alex-box-card">
            <h2>{props.message}</h2>
            <div>
                {props.children}
            </div>
        </div>
    </div>
}



export default AlertBox