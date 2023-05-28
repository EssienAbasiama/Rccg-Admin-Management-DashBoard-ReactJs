import './App.css';
import Header from './components/Header';
import Title from './components/Title';
import Body from './components/Body';
import Footer from './components/Footer';
import NewComer from './components/NewComer';

function App() {
  const handleButtonClick = () => {
    // Navigate to a new site when the button is clicked
    window.location.href = 'https://www.example.com';
    // or
    // window.location.assign('https://www.example.com');
  };
  return (
    <div className="App">
        <Header></Header>
     {/* <Title></Title>
      <Body></Body>*/}
      <NewComer></NewComer>
      <Footer></Footer> 
      
    </div>
  );
}

export default App;