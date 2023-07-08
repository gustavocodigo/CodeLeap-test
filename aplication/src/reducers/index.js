const initialState = {
    counter: 0,
    currentPostData: null,
    currentUrl: "",
    focusedPost: -1,
    alerts: {
        delete_visible: true
    }
};


import store from "../store";

async function refresh_posts(url) {
    if (url == null) url = "https://dev.codeleap.co.uk/careers/"
    const response = await fetch(url)
    const data = await response.json()
    data.url = url
    console.log(data)
    store.dispatch({ type: "UPDATE_POSTS", payload: data })

}







const sendPostRequest = async (url, postData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar a solicitação POST');
        }

        const responseData = await response.json();
        console.log(responseData);
        store.dispatch({ type: "LOAD_POSTS" })
    } catch (error) {
        console.error('Erro:', error);
    }
};

function sendDeleteRequest(url) {
    fetch(url, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Delete request sent successfully.');
            } else {
                console.error('Error sending delete request.');
            }
        })
        .catch(error => {
            console.error('Error sending delete request:', error);
        });
}








const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HIDE_DELETE_ALERT':
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    delete_visible: false
                }
            };
        case 'SHOW_DELETE_ALERT':
            return {
                ...state,
                focusedPost: action.payload.id,
                alerts: {
                    ...state.alerts,
                    delete_visible: true,
                    
                }
            };

        case 'LOAD_POSTS':
            console.log("LOADING POSTS")
            refresh_posts()
            return state;


        case 'RELOAD_POSTS':

            refresh_posts(state.currentUrl)
            return state;


        case 'UPDATE_POSTS':
            console.log("updating posts", action.payload)
            state.currentPostData = null
            return {
                ...state,
                currentPostData: action.payload,
                currentUrl: action.payload.url
            };

        case 'DELETE_POST':
            sendDeleteRequest("https://dev.codeleap.co.uk/careers/" + action.payload.id)
           
            return { ...state };
        case 'DELETE_FOCUSED_POST':
            console.log("deleting: ", state.focusedPost)
            sendDeleteRequest("https://dev.codeleap.co.uk/careers/" + state.focusedPost+"/")
          
            return state

        case 'SEND_NEW_POST':
            {

                let data = {
                    username: "gustavocodigo",
                    title: action.payload.title,
                    content: action.payload.content
                };

                sendPostRequest("https://dev.codeleap.co.uk/careers/", data)
            }
            return { ...state, responseData: null };

        case 'LOAD_NEXT_POSTS':
            if (state.currentPostData.next == null) return state
            console.log("load nexts")
            refresh_posts(state.currentPostData.next)
            console.log("updating at: ", state.currentPostData.next)
            return {
                ...state,
                currentPostData: action.payload
            };

        case 'LOAD_PREVIOUS_POSTS':
            if (state.currentPostData.previous == null) return state
            console.log("load nexts")
            refresh_posts(state.currentPostData.previous)
            console.log("updating at: ", state.currentPostData.next)
            return {
                ...state,
                currentPostData: action.payload
            };
        default:
            return state;
    }
};

export default mainReducer;