// actions.js

const incrementCounter = (amount) => {
    return {
        type: 'INCREMENT_COUNTER',
        payload: amount
    };
};


const loadPosts = () => {
    return {
        type: 'LOAD_POSTS',
    };
};

export { incrementCounter, loadPosts };
