/* eslint-disable react/prop-types */

import style from "./styles.module.css"
import MindCard from "../../components/MindCard"
import PostCard from "../../components/PostCard"
import AlertBox from "../../components/AlertBox"
import { useEffect, useState } from "react"

import store from "../../store"

import { useSelector } from "react-redux";


import loading_icon from "../../assets/loading-blue.gif"


function formatElapsedTime(dateString) {
    const now = new Date();
    const oldDate = new Date(dateString);
    const diffDuration = now - oldDate;
    let diffInSeconds = Math.floor(diffDuration / 1000);
  
    if (diffInSeconds < 5) {
      return "Right now"; // for devices with incorrect dates
    }
  
    if (diffInSeconds === 1) {
      return diffInSeconds + " second ago";
    } else if (diffInSeconds < 60) {
      return diffInSeconds + " seconds ago";
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return diffInMinutes === 1 ? diffInMinutes + " minute ago" : diffInMinutes + " minutes ago";
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return diffInHours === 1 ? diffInHours + " hour ago" : diffInHours + " hours ago";
    } else if (diffInSeconds < 604800) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return diffInDays === 1 ? diffInDays + " day ago" : diffInDays + " days ago";
    } else {
      const diffInWeeks = Math.floor(diffInSeconds / 604800);
      return diffInWeeks === 1 ? diffInWeeks + " week ago" : diffInWeeks + " weeks ago";
    }
  }
  
  


function Signup() {


    const user_visible = useSelector(state => state.alerts.user_visible);
    const username = useSelector(state => state.user);


    const currentPostData = useSelector(state => state.currentPostData);


    const alerts = useSelector(state => state.alerts);

    const [contextText, setContentText] = useState("")
    const [titleText, setTitleText] = useState("")


    const focusedPostObject = useSelector(state => state.focusedPostObject);

    useEffect(() => {
        
        if (focusedPostObject === null) return
        console.log('focusedPostObject alterado:', focusedPostObject);
        setTitleText(focusedPostObject.title)
        setContentText(focusedPostObject.content)

    }, [focusedPostObject]);




    function handleTextContent(text) {
        setContentText(text.target.value)
    }
    function handleTitleContent(text) {
        setTitleText(text.target.value)
    }



    useEffect(() => {
        setTitleText("")
        setContentText("")

    }, [])


    function send_post_handle_click() {
        store.dispatch({
            type: "EDIT_POST", payload: {
                title: titleText,
                content: contextText
            }
        })

        setTimeout(() => store.dispatch({ type: "RELOAD_POSTS" }), 1000)
        store.dispatch({ type: "HIDE_EDIT_ALERT" })

        setTitleText("")
        setContentText("")

    }


    const state = store.getState()



    useEffect(() => {
        store.dispatch({ type: "LOAD_POSTS" })
    }, [])

    function handleCancelAlertClick() {

        store.dispatch({ type: "HIDE_DELETE_ALERT" })

    }

    function handleCancelEditClick() {

        store.dispatch({ type: "HIDE_EDIT_ALERT" })

    }

    function handleDeleteAlertClick() {
        store.dispatch({ type: "HIDE_DELETE_ALERT" })


        store.dispatch({ type: "DELETE_FOCUSED_POST" })
        setTimeout(() => {
            store.dispatch({ type: "RELOAD_POSTS" })
        }, 1000)


    }


    function handleCloseUserAlert() {
        store.dispatch({ type: "HIDE_USER_ALERT" })
    }


    function userIconClick() {

        store.dispatch({ type: "SHOW_USER_ALERT" })
    }


    function loadPostss(direction) {
        if (direction == "next")
            store.dispatch({ type: "LOAD_NEXT_POSTS" })
        else if (direction == "previous")
            store.dispatch({ type: "LOAD_PREVIOUS_POSTS" })
        forceScrollToTop()
    }


    function logout() {
        localStorage.removeItem("user");
        store.dispatch({ type: "SET_USER", payload: { id: null } })
        store.dispatch({ type: "HIDE_USER_ALERT" })
    }



    function forceScrollToTop() {
        let element = document.body.childNodes[1] // the scroll itself
        if (element) {
            element.scrollTop = 0
        }

    }


    let scrollcards = <div>
        {
            currentPostData != null &&
            currentPostData.results.map((element) => {
                console.log(element.id)
                return <PostCard key={element.id} obj_id={element.id} username={element.username} message={element.content} title={element.title} date={formatElapsedTime(element.created_datetime)} editable={state.user == element.username} />
            }) ||
            <>
                <img className={style["loading-icon"]} src={loading_icon}></img>
                <b className={style["loading-text"]}>LOADING POSTS</b>
            </>

        }




    </div>


    return <div className={style["outer-component"]}>
        <div className={style["content-container"]}>
            <header className={style["component-header"]}>
                <h1 className={style["title"]}>
                    CodeLeap Network
                </h1>

                <svg onClick={userIconClick} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
            </header>
            <MindCard />

            {
                alerts.delete_visible && (
                    <AlertBox message="Are you sure you want to delete this item?">
                        <button className="button-to-right" onClick={handleCancelAlertClick}>CANCEL</button>
                        <button onClick={handleDeleteAlertClick} style={{ backgroundColor: "#FF5151" }}>DELETE</button>
                    </AlertBox>
                )
            }

            {scrollcards}

            {
                alerts.edit_visible && (
                    <AlertBox message="Edit item" >

                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

                            <small>
                                Title
                            </small>
                            <input value={titleText} placeholder="Hello world" type="text" onChange={handleTitleContent} />
                            <small className={style["content-el"]}>
                                Content
                            </small>

                            <textarea value={contextText} placeholder="Content here" className={style["content-input"]} type="text" onChange={handleTextContent} />


                            <div style={{ display: "flex", gap: "16px" }}>

                                <button className={style["cancel-editbox-button"]} onClick={handleCancelEditClick}>CANCEL</button>
                                {(contextText !== "" && titleText !== "") ? (
                                    <button onClick={send_post_handle_click} style={{ backgroundColor: "#47B960" }}>Save</button>
                                ) : (
                                    <button style={{ backgroundColor: "gray", pointerEvents: "none" }}>Save</button>
                                )}
                            </div>

                        </div>



                    </AlertBox>
                )
            }

            {currentPostData != null &&
                <div className={style["pagination"]}>
                    <button
                        onClick={() => loadPostss("previous")}
                        style={{
                            color: currentPostData.previous ? "#7695EC" : "gray",
                            pointerEvents: currentPostData.previous ? "auto" : "none",
                        }}
                    >
                        PREVIOUS PAGE
                    </button>
                    <button
                        onClick={() => loadPostss("next")}
                        style={{
                            color: currentPostData.next ? "#7695EC" : "gray",
                            pointerEvents: currentPostData.next ? "auto" : "none",
                        }}
                    >
                        NEXT PAGE
                    </button>
                </div>

            }

            {
                user_visible
                &&
                <AlertBox message="My Account">



                    <div style={{ width: "100%" }}>
                        <div style={{ overflow: "scroll" }}>
                            <b>username </b> {username}
                        </div>

                        <div style={{ display: "flex", gap: "16px", width: "100%", marginLeft: "auto" }}>
                            <button onClick={logout} className="button-to-right" style={{ backgroundColor: "#FF5151" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                                </svg>

                                LOGOUT</button>
                            <button onClick={handleCloseUserAlert}>CLOSE</button>
                        </div>



                    </div>

                </AlertBox>
            }
        </div>
    </div>

}



export default Signup;