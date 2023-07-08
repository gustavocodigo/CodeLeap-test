import './App.css';
import Signup from './Pages/Signup';
import MainScreen from './Pages/MainScreen';



import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.user);
  return (
    <div id="app">
       {(user == null ? <Signup /> : <MainScreen />)}
    </div>
  );
}

export default App;
