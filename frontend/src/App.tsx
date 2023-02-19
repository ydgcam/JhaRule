import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import THEME from './components/Theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoginPage from './scenes/login/index';
import AppHeader from './components/AppHeader';
import LandingPage from './scenes/landing/index';
import DocumentList from './components/DocumentList';
import ProfilePage from './scenes/profile/index';

//TODO: Implement authentication hook for routing

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<AppHeader />}>
              <Route path='/' element={<LandingPage />}>
                <Route index element={<DocumentList />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
