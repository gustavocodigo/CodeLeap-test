
import "./styles.css"

import MindCard from "../../components/MindCard"
import PostCard from "../../components/PostCard"


import AlertBox from "../../components/AlertBox"




function Signup() {

    

    function handleCancelAlertClick() {
        this.remove();
    }
    return <div className="outer-component">
        <dir className="content-container">
            <header className="component-header">
                <h1 id="title">
                    CodeLeap Network
                </h1>
            </header>

            <MindCard>

            </MindCard>

            <PostCard  username="gustavo" message="my message is cool" editable={true}/>
            <PostCard  username="Vini" message="my message is  dadsd cool"/>

            <PostCard  username="Kitty" message="my message issas  cosd ol"/>


            {/* <AlertBox message="Are you sure you want to delete this item?">
                <button className="button-to-right" onClick={handleCancelAlertClick}>CANCEL</button>
                <button style={{ backgroundColor: "#FF5151"}}>DELETE</button>
            </AlertBox> */}
        </dir>
    </div>
}

export default Signup