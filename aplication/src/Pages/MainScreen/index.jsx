
import style from "./styles.module.css"
import MindCard from "../../components/MindCard"
import PostCard from "../../components/PostCard"
import AlertBox from "../../components/AlertBox"
import { useEffect, useState } from "react"

import store from "../../store"
import { loadPosts } from "../../actions"
import { connect } from "react-redux";


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




const name = "gustavocodigo"

function Signup({ currentPostData, alerts }) {





    useEffect(() => {
        store.dispatch(loadPosts())
    }, [])

    function handleCancelAlertClick() {

        store.dispatch({ type: "HIDE_DELETE_ALERT" })
      
    }

    function handleDeleteAlertClick() {
        store.dispatch({ type: "HIDE_DELETE_ALERT" })


        store.dispatch({ type: "DELETE_FOCUSED_POST" })
        setTimeout(()=> {
            store.dispatch({ type: "RELOAD_POSTS" })
        },1000)
       
        
    }


    function loadPostss(direction) {
        if (direction == "next")
            store.dispatch({ type: "LOAD_NEXT_POSTS" })
        else if (direction == "previous")
            store.dispatch({ type: "LOAD_PREVIOUS_POSTS" })
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
                    currentPostData != null &&
                    currentPostData.results.map((element) => {
                        console.log(element.id)
                        return <PostCard key={element.id} obj_id={element.id} username={element.username} message={element.content} title={element.title} date={formatElapsedTime(element.created_datetime)} editable={name == element.username} />
                    }) ||
                    <>
                        <img className={style["loading-icon"]} src="loading-blue.gif"></img>
                        <b className={style["loading-text"]}>LOADING POSTS</b>
                    </>

                }

              
            </div>
            {
                alerts.delete_visible && (
                    <AlertBox message="Are you sure you want to delete this item?">
                        <button className="button-to-right" onClick={handleCancelAlertClick}>CANCEL</button>
                        <button onClick={handleDeleteAlertClick} style={{ backgroundColor: "#FF5151" }}>DELETE</button>
                    </AlertBox>
                )
            }

            {currentPostData != null &&
                <div className={style["pagination"]}>
                    <button onClick={() => loadPostss("previous")} style={{ color: (currentPostData.previous && " #7695EC" || "gray") }} >PREVIOUS PAGE</button>
                    <button onClick={() => loadPostss("next")} style={{ color: (currentPostData.next && " #7695EC" || "gray") }} >NEXT PAGE</button>
                </div>
            }
        </div>
    </div>

}

const mapStateToProps = (state) => {
    return {
        currentPostData: state.currentPostData,
        alerts: state.alerts,
    };
};


const mapDispatchToProps = {
    loadPosts, // Mapeia a ação 'loadPosts' para a propriedade 'loadPosts' do componente
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);