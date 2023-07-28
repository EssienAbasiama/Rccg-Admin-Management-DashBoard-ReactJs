import { useAuth } from './api/AuthContext';

function Logout() {
  const { handleLogout } = useAuth();

  const handleAutomaticLogout = () => {
    handleLogout();
    // You can also perform additional tasks here if needed
  };

  return null; // Return null as this component doesn't render anything
}

export default Logout;
