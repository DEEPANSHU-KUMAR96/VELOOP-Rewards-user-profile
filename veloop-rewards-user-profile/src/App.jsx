import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProfilePage } from './pages/UserProfilePage';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <UserProfilePage />
      </ProfileProvider>
    </ThemeProvider>
  );
};

export default App;