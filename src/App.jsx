import "./App.css";
import LockScreen from "./components/LockScreen";
import { AuthProvider } from "./components/api/AuthContext";
// import Login from './Login';
// import ProtectedData from './ProtectedData';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LockScreen></LockScreen>
      </AuthProvider>
    </div>
  );
}

export default App;
