const initialState = {
    posts: [] // array inicial vazio para armazenar os posts
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_POST':
        return {
          ...state,
          posts: [...state.posts, action.payload.text] // adiciona o novo post ao array de posts
        };
      default:
        return state; // retorna o estado atual se a ação não for reconhecida
    }
  };
  
  export default postReducer;
  