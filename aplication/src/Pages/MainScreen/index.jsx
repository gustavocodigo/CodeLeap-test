
import style from "./styles.module.css"
import MindCard from "../../components/MindCard"
import PostCard from "../../components/PostCard"
import AlertBox from "../../components/AlertBox"
import { useEffect, useState } from "react"

import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/postActions';



function formatElapsedTime(dateString) {

   
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMilliseconds = now - date;
    const diffMinutes = Math.floor(diffMilliseconds / 1000 / 60);

    if (diffMinutes < 60) {
        return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
        const diffHours = Math.floor(diffMinutes / 60);
        return `${diffHours} hours ago`;
    } else {
        const diffDays = Math.floor(diffMinutes / 1440);
        return `${diffDays} days ago`;
    }
}




const name = "CodeLeap network"

function Signup() {




    const [currentElement, setCurrentElement] = useState()
    const [list, setList] = useState([])


   

    const [showAlert, setShowAlert] = useState(true)

    useEffect(() => {
        (async function () {
            const response = await fetch("https://dev.codeleap.co.uk/careers/")
            const data = await response.json()
            setCurrentElement(data)
            console.log('response', data)
            setList(data.results.map((element) => {
                return { username: element.username, content: element.content, title: element.title, date: element.created_datetime }
            }))
        })()
    }, [])

    function handleCancelAlertClick() {
        // setShowAlert(false)

    }

    return <div className={style["outer-component"]}>
            <div className={style["content-container"]}>
                <header className={style["component-header"]}>
                    <h1 className={style["title"]}>
                        CodeLeap Network
                    </h1>
                </header>
                <MindCard />
                <div>
                    {
                        list.map((element, index) => {
                            return <PostCard key={index} username={element.username} message={element.content} title={element.title} date={formatElapsedTime(element.date)} editable={name == element.username} />
                        })
                    }
                </div>
                {
                    showAlert ? (
                        <AlertBox message="Are you sure you want to delete this item?">
                            <button className="button-to-right" onClick={handleCancelAlertClick}>CANCEL</button>
                            <button style={{ backgroundColor: "#FF5151" }}>DELETE</button>
                        </AlertBox>
                    ) : null
                }
                <div className={style["pagination"]}>
                    <button>PREVIOUS PAGE </button>
                    <button>NEXT PAGE</button>
                </div>
            </div>
        </div>
  
}

export default Signup