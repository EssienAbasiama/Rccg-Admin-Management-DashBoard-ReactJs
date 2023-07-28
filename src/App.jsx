import './App.css';
import Header from './components/Header';
import Title from './components/Title';
import Body from './components/Body';
import Footer from './components/Footer';
import NewComer from './components/NewComer';
import LockScreen from './components/LockScreen';

function App() {
  const handleButtonClick = () => {
    // Navigate to a new site when the button is clicked
    window.location.href = 'https://www.example.com';
    // or
    // window.location.assign('https://www.example.com');
  };
  return (
    <div className="App">
      <LockScreen></LockScreen>
    </div>
  );
}

export default App;