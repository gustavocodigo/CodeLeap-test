import './App.css';
import Signup from './Pages/Signup';
import MainScreen from './Pages/MainScreen';

import {Provider} from "react-redux"
import store from './store';






function App() {
  return (<Provider store={store}>
  <div id="app">
      {/* <Signup /> */}
      
      <MainScreen/>
    </div>

  </Provider>
  
  
    
  );
}

export default App;
