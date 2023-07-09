const initialState = {
    counter: 0,
    currentPostData: null,
    currentUrl: "",
    focusedPost: -1,
    alerts: {
        delete_visible: false,
        edit_visible: false,
        user_visible: false
    },


    focusedPostObject: null,


    user: null
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


function sendPatchRequest(url, data) {
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Patch request sent successfully.');
            } else {
                console.error('Error sending patch request. Status code:', response.status);
            }
        })
        .catch(error => {
            console.error('Error sending patch request:', error);
        });
}





const mainReducer = (state = initialState, action) => {
    switch (action.type) {


        case 'SET_USER':
            return { ...state, user: action.payload.user }

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

        case 'SHOW_USER_ALERT':
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    user_visible: true,
                }
            };

        case 'HIDE_USER_ALERT':
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    user_visible: false,
                }
            };

        case 'HIDE_EDIT_ALERT':
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    edit_visible: false
                }
            };
        case 'SHOW_EDIT_ALERT':
            const element = state.currentPostData.results.filter((element) =>  (
                element.id === action.payload.id))[0]



                console.log("focos =>", element)

            return {
                ...state,
                focusedPost: action.payload.id,
                
                focusedPostObject : element,
                alerts: {
                    ...state.alerts,
                    edit_visible: true,

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

        case 'EDIT_POST':
            {
                let data = {
                    title: action.payload.title,
                    content: action.payload.content
                };


                sendPatchRequest("https://dev.codeleap.co.uk/careers/" + state.focusedPost + "/", data)
            }
            return { ...state };
        case 'DELETE_FOCUSED_POST':
            console.log("deleting: ", state.focusedPost)
            sendDeleteRequest("https://dev.codeleap.co.uk/careers/" + state.focusedPost + "/")

            return state

        case 'SEND_NEW_POST':
            {

                let data = {
                    username: state.user,
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